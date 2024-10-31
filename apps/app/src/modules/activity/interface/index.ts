export interface IActivityCalendarEvent<T> {
  start: Date;
  end: Date;
  title: string;
  content: T[];
}
