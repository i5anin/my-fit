export interface IEntity {
  _id?: string;
  dateCreated?: Date | string;
  dateUpdated?: Date | string;
}

export interface IUser extends IEntity {
  email: string;
  password?: string;
}

interface IMuscleGroup {
  _id: string;
  title: string;
  icon: string;
}

export interface IExercise extends IEntity {
  title: string;
  muscleGroups: IMuscleGroup[];
  weights?: number[];
  defaultWeight?: number;
}

export interface IExerciseChoosen extends IEntity {
  exercise?: IExercise;
  repeats: number;
  weight?: number;
}

export interface IExerciseDone extends IExerciseChoosen {
  isToFailure?: boolean;
  duration?: number;
  isDone?: boolean;
}

export interface IActivity extends IEntity {
  exercises: IExerciseDone[];
  isDone: boolean;
}

export interface IActivityStatistics {
  activitiesCount: number;
  setsCount: number;
  repeatsCount: number;
  duration: number;
  averageSetsPerActivity: number;
  averageRepeatsPerActivity: number;
  averageRepeatsPerSet: number;
  averageDuration: number;
}

export interface IExerciseStatistics {
  _id: string;
  title: string;
  sets: number;
  repeats: number;
}

export interface IUserToken {
  _id: string;
  email: string;
  token?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IBaseReply {
  message: string;
}

export interface IBaseParams {
  id: string;
}

export declare const API_AUTH_CHECK = "/auth/check";
export declare const API_AUTH_LOGIN = "/auth/login";
export declare const API_AUTH_SETUP = "/auth/setup";
export declare const API_USER = "/user";
export declare const API_EXERCISE = "/exercise";
export declare const API_EXERCISE_STATISTICS = "/exercise_statistics";
export declare const API_ACTIVITY = "/activity";
export declare const API_ACTIVITY_CALENDAR = "/activity_calendar";
export declare const API_ACTIVITY_LAST = "/activity_last";
