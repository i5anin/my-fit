import { Schema, model } from 'mongoose';

import type { IActivity } from 'fitness-tracker-contracts';

const activitySchema = new Schema<IActivity>(
  {
    exercises: {
      type: [
        {
          exercise: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
          repetitions: Number,
          duration: Number,
          isToFailure: Boolean,
          isDone: Boolean,
          weight: Number,
        },
      ],
    },
    duration: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Activity', activitySchema);
