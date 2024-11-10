import { ComputedRef } from 'vue';
import {
  API_EXERCISE,
  API_EXERCISE_STATISTICS,
  IExercise,
  IBaseReply,
  IExerciseStatistics,
  IActivityStatistics,
} from 'fitness-tracker-contracts';
import { useMutation, useQuery, api } from 'mhz-helpers';

export function getExercises() {
  return useQuery({
    queryKey: [API_EXERCISE],
    queryFn: async () => {
      const { data } = await api.get<IExercise[]>(API_EXERCISE);

      return data;
    },
  });
}

export function getStatistics() {
  return useQuery({
    queryKey: [API_EXERCISE_STATISTICS],
    queryFn: async () => {
      const { data } = await api.get<{ activity: IActivityStatistics; exercise: IExerciseStatistics[] }>(
        API_EXERCISE_STATISTICS
      );

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
