// eslint-disable-next-line import-x/named
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import type { IUserToken } from 'fitness-tracker-contracts';

export default fp(async function (fastify) {
  const secret = process.env.SECRET;

  if (!secret) return;

  fastify.register(jwt, { secret });

  fastify.decorate('onlyAdmin', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: IUserToken = await request.jwtVerify();

      if (user.role !== 'admin') reply.code(403).send({ message: 'Authentication error' });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });

  fastify.decorate('onlyUser', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: IUserToken = await request.jwtVerify();

      if (user.role !== 'user') reply.code(403).send({ message: 'Authentication error' });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });

  fastify.decorate('onlyLoggedIn', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });
});
