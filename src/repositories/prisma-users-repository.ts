import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: {
    id?: string
    name: string
    email: string
    password_hash: string
    created_at?: Date
    updated_at?: Date
  }) {
    const user = await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        created_at: data.created_at,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: data.password_hash, // Include the password property
      password_hash: user.password_hash,
      created_at: user.created_at,
    }
  }

  async list() {
    const users: User[] = await prisma.user.findMany()
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password_hash, // Map password_hash to password
      created_at: user.created_at,
    }))
  }
}
