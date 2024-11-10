import type { IActivity, IActivityStatistics, IExercise, IExerciseStatistics } from 'fitness-tracker-contracts';

import Exercise from '../models/exercise.js';
import Activity from '../models/activity.js';

import { IExerciseService } from '../interface/index.js';

export const exerciseService: IExerciseService = {
  getAll: async () => {
    const data = await Exercise.find().sort('title');

    return data as IExercise[];
  },

  getStatistics: async () => {
    const activities = await Activity.find().select('_id exercises').populate({ path: 'exercises' }).lean().exec();
    const exercises = await Exercise.find().select(['_id', 'title']).lean().exec();

    const activitiesCount = activities.length;
    const setsCount = activities.reduce((acc, current) => acc + (current.exercises.length || 0), 0);
    const repeatsCount = activities.reduce(
      (acc, current) => acc + current.exercises.reduce((accEx, currentEx) => accEx + (currentEx.repeats || 0), 0),
      0
    );
    const averageSetsPerActivity = Math.round(setsCount / activitiesCount);
    const averageRepeatsPerActivity = Math.round(repeatsCount / activitiesCount);
    const averageRepeatsPerSet = Math.round(repeatsCount / setsCount);

    const activityStatistics: IActivityStatistics = {
      activitiesCount,
      setsCount,
      repeatsCount,
      averageSetsPerActivity,
      averageRepeatsPerActivity,
      averageRepeatsPerSet,
    };

    const exerciseStatistics: IExerciseStatistics[] = [];

    exercises.forEach((exercise: IExercise) => {
      const exerciseStatisticsElement: IExerciseStatistics = {
        _id: exercise._id || '',
        title: exercise.title,
        sets: 0,
        repeats: 0,
      };

      activities.forEach((activity: IActivity) => {
        const filteredExercises = activity.exercises.filter(
          (exerciseToFilter) => exerciseToFilter.exercise?.toString() === exercise._id?.toString()
        );

        exerciseStatisticsElement.sets += filteredExercises.length;
        exerciseStatisticsElement.repeats += filteredExercises.reduce(
          (acc, current) => acc + (current.repeats || 0),
          0
        );
      });

      exerciseStatistics.push(exerciseStatisticsElement);
    });

    return { activity: activityStatistics, exercise: exerciseStatistics.sort((a, b) => b.repeats - a.repeats) };
  },

  getOne: async <T>(_id: string) => {
    const exercise: IExercise | null = await Exercise.findOne({ _id }).lean().exec();

    return { data: exercise as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Exercise.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(exerciseToCreate: T) => {
    const exercise = new Exercise(exerciseToCreate);

    await exercise.save();
  },

  delete: async (_id?: string) => {
    const exercise = await Exercise.findOne({ _id });

    await exercise?.deleteOne();
  },
};
