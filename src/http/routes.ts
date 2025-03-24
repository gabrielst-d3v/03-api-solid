import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { list } from './controllers/list'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users', list)
}
