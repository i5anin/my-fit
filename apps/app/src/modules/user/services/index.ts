import { ComputedRef, Ref } from 'vue';
import { API_USER, IUser, IBaseReply } from 'fitness-tracker-contracts';
import { useMutation, useQuery, api } from 'mhz-helpers';

export function getUsers(page: Ref<number>) {
  return useQuery({
    queryKey: [API_USER, page],
    queryFn: async () => {
      const { data } = await api.get<{ data: IUser[]; total: number }>(API_USER, { params: { page: page.value } });

      return data;
    },
  });
}

export function getUser(id?: ComputedRef<string | string[]>) {
  return useQuery({
    queryKey: [API_USER, id],
    queryFn: async () => {
      if (!id?.value) return null;

      const { data } = await api.get<{ data: IUser }>(`${API_USER}/${id.value}`);

      return data.data;
    },
  });
}

export function postUser(options: object) {
  return useMutation({
    mutationKey: [API_USER],
    mutationFn: async (formData: IUser) => {
      const { data } = await api.post<IBaseReply>(API_USER, formData);

      return data;
    },
    ...options,
  });
}

export function updateUser(options: object) {
  return useMutation({
    mutationKey: [API_USER],
    mutationFn: async (formData: IUser) => {
      const { data } = await api.patch<IBaseReply>(`${API_USER}/${formData._id}`, formData);

      return data;
    },
    ...options,
  });
}

export function deleteUser(options: object) {
  return useMutation({
    mutationKey: [API_USER],
    mutationFn: async (id?: string) => {
      if (!id) return null;

      const { data } = await api.delete<IBaseReply>(`${API_USER}/${id}`);

      return data;
    },
    ...options,
  });
}
