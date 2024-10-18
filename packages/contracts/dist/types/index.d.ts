export interface IEntity {
  _id?: string;
  dateCreated?: Date | string;
  dateUpdated?: Date | string;
}

export type TUserRole = "user" | "admin";

export interface IUser extends IEntity {
  email: string;
  password?: string;
  role?: TUserRole;
}

export interface IExercise extends IEntity {
  title: string;
}

export interface IExerciseDone extends IEntity {
  exercise: IExercise;
  repetitions: number;
  duration: number;
}

export interface IActivity extends IEntity {
  exercises: IExerciseDone[];
  duration: number;
}

export interface IUserToken {
  _id: string;
  email: string;
  role: TUserRole;
  token?: string;
}

export interface ISignUpData {
  email: string;
  password: string;
}

export interface ILoginData extends ISignUpData {
  role: TUserRole;
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

export declare const API_UPLOAD = "/upload";
