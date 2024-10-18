import { API_EXERCISE } from 'fitness-tracker-contracts';
import type { IBaseReply, IExercise, IBaseParams, ISignUpData } from 'fitness-tracker-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { exerciseService } from '../services/exercise.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { page: number }; Reply: { 200: { data: IExercise[]; total?: number } } }>(
    API_EXERCISE,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      const { data, total } = await exerciseService.getMany<IExercise>(request.query.page);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IExercise | null } } }>(
    `${API_EXERCISE}/:id`,
    async function (request, reply) {
      const data = await exerciseService.getOne<IExercise>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: IExercise; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_EXERCISE}/:id`,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      await exerciseService.update<IExercise>(request.body, request.params.id);

      reply.code(200).send({ message: 'Exercise updated' });
    }
  );

  fastify.post<{ Body: ISignUpData; Reply: { 201: IBaseReply } }>(
    API_EXERCISE,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      await exerciseService.create<ISignUpData>(request.body);

      reply.code(201).send({ message: 'Exercise created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_EXERCISE}/:id`,
    { preValidation: [fastify.onlyAdmin] },
    async function (request, reply) {
      await exerciseService.delete(request.params.id);

      reply.code(200).send({ message: 'Exercise deleted' });
    }
  );
}
