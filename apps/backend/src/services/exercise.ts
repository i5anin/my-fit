import type { IExercise } from 'fitness-tracker-contracts';

import Exercise from '../models/exercise.js';

import { paginate } from '../helpers/index.js';
import { IBaseService } from '../interface/index.js';

export const exerciseService: IBaseService = {
  getMany: async <T>(page?: number) => {
    const { data, total } = await paginate(Exercise, page, 'title');

    return { data: data as T[], total };
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
