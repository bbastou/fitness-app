export class CreateUserCommand {
  constructor(public readonly id: string, public readonly token: string) {}
}
