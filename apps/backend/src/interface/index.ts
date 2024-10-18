import type { FastifyInstance, FastifySchema } from 'fastify';

import type { ILoginData, IUser, ISignUpData, IUserToken, IFileToUpload } from 'fitness-tracker-contracts';

export interface IFastifyInstance extends FastifyInstance {
  onlyAdmin: () => void;
  onlyUser: () => void;
  onlyLoggedIn: () => void;
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

export interface IUserService extends IBaseService {
  getCurrent: (decode: (token: string) => IUserToken | null, token?: string) => Promise<IUser | null>;
}

export interface IAuthService {
  check: (request: { jwtVerify: () => Promise<void> }) => Promise<void>;

  login: (
    loginData: ILoginData,
    signData: (payload: IUserToken, options: object) => string
  ) => Promise<{
    user?: IUserToken;
    isUserNotFound: boolean;
    isWrongPassword: boolean;
  }>;

  setup: (admin: ISignUpData) => Promise<boolean>;
}

export interface IUploadService {
  upload: (file: IFileToUpload | undefined) => Promise<{ filename: string; isFileExists: boolean }>;

  delete: (_id: string) => Promise<void>;
}
