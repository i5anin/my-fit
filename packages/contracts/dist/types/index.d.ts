export interface IEntity {
  _id?: string;
  dateCreated?: Date | string;
  dateUpdated?: Date | string;
}

export interface IUser extends IEntity {
  email: string;
  password?: string;
}

export interface IExercise extends IEntity {
  title: string;
  weights?: number[];
  defaultWeight?: number;
}

export interface IExerciseChoosen extends IEntity {
  exercise: IExercise;
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
  duration: number;
  isDone: boolean;
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

export interface IFileToUpload {
  type: "file";
  filename: string;
  file: NodeJS.ReadableStream;
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
export declare const API_ACTIVITY = "/activity";
export declare const API_ACTIVITY_CALENDAR = "/activity_calendar";
export declare const API_UPLOAD = "/upload";
