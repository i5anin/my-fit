import { API_ACTIVITY } from 'fitness-tracker-contracts';
import type { IBaseReply, IActivity, IBaseParams } from 'fitness-tracker-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { activityService } from '../services/activity.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { page: number }; Reply: { 200: { data: IActivity[]; total?: number } } }>(
    API_ACTIVITY,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      const { data, total } = await activityService.getMany<IActivity>(request.query.page);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IActivity | null } } }>(
    `${API_ACTIVITY}/:id`,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      const data = await activityService.getOne<IActivity>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.patch<{ Body: IActivity; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_ACTIVITY}/:id`,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      await activityService.update<IActivity>(request.body, request.params.id);

      reply.code(200).send({ message: 'Занятие обновлено' });
    }
  );

  fastify.post<{ Body: IActivity; Reply: { 201: string; 500: IBaseReply } }>(
    API_ACTIVITY,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      const id = await activityService.create<IActivity>(request.body);

      if (id) {
        reply.code(201).send(id.toString());
      } else {
        reply.code(500).send({ message: 'Ошибка создания занятия' });
      }
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_ACTIVITY}/:id`,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      await activityService.delete(request.params.id);

      reply.code(200).send({ message: 'Занятие удалено' });
    }
  );
}
