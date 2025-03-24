interface ListUseCaseResponse {
  id: string
  name: string
  email: string
  password: string
}

export class ListUseCase {
  constructor(
    private usersRepository: {
      list: () => Promise<ListUseCaseResponse[]>
    },
  ) {}

  async execute() {
    return this.usersRepository.list()
  }
}
