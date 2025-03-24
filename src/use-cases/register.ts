import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  id: string
  email: string
  password: string
  password_hash: string
  created_at: Date
}

export class RegisterUseCase {
  constructor(
    private usersRepository: {
      create: (data: {
        id?: string
        name: string
        email: string
        password_hash: string
        created_at?: Date
        updated_at?: Date
      }) => Promise<RegisterUseCaseRequest>
    },
  ) {}

  async execute({
    name,
    email,
    password,
  }: Omit<RegisterUseCaseRequest, 'id' | 'password_hash' | 'created_at'>) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('User with same email already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
