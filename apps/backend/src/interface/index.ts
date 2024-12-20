import type { FastifyInstance, FastifySchema } from 'fastify';

import type {
  ILoginData,
  IUser,
  IUserToken,
  IActivity,
  IExercise,
  IExerciseStatistics,
  IActivityStatistics,
  IActivityChart,
  TActivityChartType,
} from 'fitness-tracker-contracts';

export interface IFastifyInstance extends FastifyInstance {
  onlyUser: () => void;
}

export interface ISchema {
  schema: FastifySchema;
}

export interface IBaseService {
  getMany: <T>(
    page?: number,
    decode?: (token: string) => IUserToken | null,
    token?: string
  ) => Promise<{ data: T[]; total?: number }>;

  getOne: <T>(
    id: string,
    decode?: (token: string) => IUserToken | null,
    token?: string
  ) => Promise<{
    data: T | null;
  }>;

  update: <T>(
    itemToUpdate?: T,
    _id?: string,
    decode?: (token: string) => IUserToken | null,
    token?: string
  ) => Promise<boolean | void>;

  create: <T>(
    item?: T,
    decode?: (token: string) => IUserToken | null,
    token?: string
  ) => Promise<string | boolean | void>;

  delete: (_id?: string, decode?: (token: string) => IUserToken | null, token?: string) => Promise<boolean | void>;
}

export interface IExerciseService extends Pick<IBaseService, 'getOne' | 'update' | 'create' | 'delete'> {
  getAll: (decode?: (token: string) => IUserToken | null, token?: string) => Promise<IExercise[]>;
}

export interface IUserService extends IBaseService {
  getCurrent: (decode: (token: string) => IUserToken | null, token?: string) => Promise<IUser | null>;
}

export interface IActivityService extends IBaseService {
  getCalendar: (dateFrom: string, dateTo: string) => Promise<IActivity[]>;

  getStatistics: () => Promise<{ activity: IActivityStatistics; exercise: IExerciseStatistics[] }>;

  getChart: (type: TActivityChartType) => Promise<IActivityChart>;

  getLast: <T>(
    decode?: (token: string) => IUserToken | null,
    token?: string
  ) => Promise<{
    data: T | null;
  }>;
}

export interface IAuthService {
  check: (request: { jwtVerify: () => Promise<void> }) => Promise<void>;

  login: (
    loginData: ILoginData,
    signData: (payload: IUserToken, options: object) => string
  ) => Promise<{ user?: IUserToken; isUserNotFound: boolean; isWrongPassword: boolean }>;

  setup: (admin: ILoginData) => Promise<boolean>;
}
