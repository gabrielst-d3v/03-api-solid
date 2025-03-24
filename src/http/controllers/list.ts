import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { ListUseCase } from '@/use-cases/list'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository()
  const listUseCase = new ListUseCase(usersRepository)

  return reply.send(await listUseCase.execute())
}
