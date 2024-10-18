import { API_UPLOAD } from 'fitness-tracker-contracts';
import type { IBaseReply, IBaseParams } from 'fitness-tracker-contracts';

import { uploadService } from '../services/upload.js';
import { IFastifyInstance } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Reply: { 200: string; '5xx': IBaseReply } }>(
    API_UPLOAD,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      const file = await request.file();

      const { filename, isFileExists } = await uploadService.upload(file);

      if (isFileExists) {
        reply.code(200).send(filename);
      } else {
        reply.code(500).send({ message: 'File upload error' });
      }
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_UPLOAD}/:id`,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      await uploadService.delete(request.params.id);

      reply.code(200).send({ message: 'File deleted' });
    }
  );
}
