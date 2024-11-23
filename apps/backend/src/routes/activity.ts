import {
  API_ACTIVITY,
  API_ACTIVITY_CALENDAR,
  API_ACTIVITY_LAST,
  API_ACTIVITY_STATISTICS,
  API_ACTIVITY_CHART,
} from 'fitness-tracker-contracts';
import type {
  IBaseReply,
  IActivity,
  IBaseParams,
  IActivityStatistics,
  IActivityChart,
  IExerciseStatistics,
} from 'fitness-tracker-contracts';

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

  fastify.get<{ Querystring: { dateFrom: string; dateTo: string }; Reply: { 200: IActivity[] } }>(
    API_ACTIVITY_CALENDAR,
    async function (request, reply) {
      const data = await activityService.getCalendar(request.query.dateFrom, request.query.dateTo);

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Reply: { 200: { activity: IActivityStatistics; exercise: IExerciseStatistics[] } } }>(
    API_ACTIVITY_STATISTICS,
    async function (request, reply) {
      const data = await activityService.getStatistics();

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Reply: { 200: IActivityChart } }>(API_ACTIVITY_CHART, async function (request, reply) {
    const data = await activityService.getChart();

    reply.code(200).send(data);
  });

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IActivity | null } } }>(
    `${API_ACTIVITY}/:id`,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      const data = await activityService.getOne<IActivity>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Reply: { 200: { data: IActivity | null } } }>(
    API_ACTIVITY_LAST,
    { preValidation: [fastify.onlyUser] },
    async function (request, reply) {
      const data = await activityService.getLast<IActivity>();

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
