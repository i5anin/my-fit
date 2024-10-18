import {
  API_AUTH_CHECK,
  API_AUTH_LOGIN,
  API_AUTH_SETUP,
  IBaseReply,
  ILoginData,
  IUserToken,
} from 'fitness-tracker-contracts';

import { useQuery, useMutation } from '@/common/plugins/query';
import { api } from '@/common/plugins/api';
import { setAuth } from '@/auth/composables/useAuth';

export function checkAuth() {
  return useQuery({
    queryKey: [API_AUTH_CHECK],
    queryFn: async () => {
      const { data } = await api.get<IBaseReply>(API_AUTH_CHECK);

      if (data.message) setAuth(true);

      return data;
    },
  });
}

export function setup(options: object) {
  return useMutation({
    mutationKey: [API_AUTH_SETUP],
    mutationFn: async (formData: ILoginData) => {
      const { data } = await api.post<IBaseReply>(API_AUTH_SETUP, formData);

      return data;
    },
    ...options,
  });
}

export function login(options: object) {
  return useMutation({
    mutationKey: [API_AUTH_LOGIN],
    mutationFn: async (formData: ILoginData) => {
      const { data } = await api.post<IUserToken>(API_AUTH_LOGIN, formData);

      return data;
    },
    ...options,
  });
}
