import { ComputedRef, Ref } from 'vue';
import { API_EXERCISE, IExercise, IBaseReply } from 'fitness-tracker-contracts';

import { useMutation, useQuery } from '@/common/plugins/query';
import { api } from '@/common/plugins/api';

export function getExercises(page: Ref<number>) {
  return useQuery({
    queryKey: [API_EXERCISE, page],
    queryFn: async () => {
      const { data } = await api.get<{ data: IExercise[]; total: number }>(API_EXERCISE, {
        params: { page: page.value },
      });

      return data;
    },
  });
}

export function getExercise(id?: ComputedRef<string | string[]>) {
  return useQuery({
    queryKey: [API_EXERCISE, id],
    queryFn: async () => {
      if (!id?.value) return null;

      const { data } = await api.get<{ data: IExercise }>(`${API_EXERCISE}/${id.value}`);

      return data.data;
    },
  });
}

export function postExercise(options: object) {
  return useMutation({
    mutationKey: [API_EXERCISE],
    mutationFn: async (formData: IExercise) => {
      const { data } = await api.post<IBaseReply>(API_EXERCISE, formData);

      return data;
    },
    ...options,
  });
}

export function updateExercise(options: object) {
  return useMutation({
    mutationKey: [API_EXERCISE],
    mutationFn: async (formData: IExercise) => {
      const { data } = await api.patch<IBaseReply>(`${API_EXERCISE}/${formData._id}`, formData);

      return data;
    },
    ...options,
  });
}

export function deleteExercise(options: object) {
  return useMutation({
    mutationKey: [API_EXERCISE],
    mutationFn: async (id?: string) => {
      if (!id) return null;

      const { data } = await api.delete<IBaseReply>(`${API_EXERCISE}/${id}`);

      return data;
    },
    ...options,
  });
}
