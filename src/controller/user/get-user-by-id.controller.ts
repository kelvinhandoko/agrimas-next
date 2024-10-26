import { type UserRepository } from "@/infrastructure/repositories/user.repository";

export class GetUserByIdController {
  constructor(private _userRepository: UserRepository) {}

  async execute(id: string) {
    return this._userRepository.findUserById(id);
  }
}
