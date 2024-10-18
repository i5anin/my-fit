import { API_UPLOAD, IBaseReply } from 'fitness-tracker-contracts';

import { useMutation } from '@/common/plugins/query';
import { api } from '@/common/plugins/api';

export function uploadFile(options: object) {
  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: async (file?: File) => {
      if (!file) throw new Error();

      const formData = new FormData();

      formData.append('file', file);

      const { data } = await api.post<string>(API_UPLOAD, formData);

      return data;
    },
    ...options,
  });
}

export function deleteFile() {
  return useMutation({
    mutationKey: [API_UPLOAD],
    mutationFn: async (file: { url: string; isThumb: boolean }) => {
      const { data } = await api.delete<IBaseReply>(`${API_UPLOAD}/${file.url}`, { params: { thumb: file.isThumb } });

      return data;
    },
  });
}
