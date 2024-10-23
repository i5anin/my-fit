import type { IActivity } from 'fitness-tracker-contracts';

import Activity from '../models/activity.js';

import { paginate } from '../helpers/index.js';
import { IBaseService } from '../interface/index.js';

export const activityService: IBaseService = {
  getMany: async <T>(page?: number) => {
    const { data, total } = await paginate(Activity, page);

    return { data: data as T[], total };
  },

  getOne: async <T>(_id: string) => {
    const activity: IActivity | null = await Activity.findOne({ _id })
      .populate({ path: 'exercises.exercise', select: 'title' })
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
