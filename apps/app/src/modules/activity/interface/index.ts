export interface IActivityCalendarEvent<T> {
  start: Date;
  end: Date;
  title: string;
  content: T[];
}

export interface ICalendarEvent {
  firstCellDate: string;
  lastCellDate: string;
}
