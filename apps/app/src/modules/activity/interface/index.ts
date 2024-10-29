import { IExerciseDone } from 'fitness-tracker-contracts';

export interface IActivityCalendarEvent {
  start: Date;
  end: Date;
  title: string;
  content: IExerciseDone[];
}
