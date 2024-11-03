import type { IActivity } from 'fitness-tracker-contracts';

import Activity from '../models/activity.js';

import { paginate } from '../helpers/index.js';
import { IActivityService } from '../interface/index.js';

export const activityService: IActivityService = {
  getMany: async <T>(page?: number) => {
    const { data, total } = await paginate(Activity, page);

    return { data: data as T[], total };
  },

  getCalendar: async <T>(dateFrom: string, dateTo: string) => {
    const data = await Activity.find({ dateCreated: { $gte: new Date(dateFrom), $lt: new Date(dateTo) } })
      .populate({ path: 'exercises.exercise', select: ['title', 'muscleGroups'] })
      .lean()
      .exec();

    return data as T[];
  },

  getOne: async <T>(_id: string) => {
    const activity: IActivity | null = await Activity.findOne({ _id })
      .populate({ path: 'exercises.exercise', select: ['title', 'muscleGroups'] })
      .lean()
      .exec();

    return { data: activity as T };
  },

  getLast: async <T>() => {
    const activity: IActivity | null = await Activity.findOne()
      .sort('-dateCreated')
      .populate({ path: 'exercises.exercise', select: ['title', 'muscleGroups'] })
      .lean()
      .exec();

    return { data: activity as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Activity.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(activityToCreate: T) => {
    const activity = new Activity(activityToCreate);

    const newActivity = await activity.save();

    const id = newActivity._id.toString();

    return id;
  },

  delete: async (_id?: string) => {
    const activity = await Activity.findOne({ _id });

    await activity?.deleteOne();
  },
};
