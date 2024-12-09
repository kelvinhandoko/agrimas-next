import { type UserRepository } from "@/server/user/user.repository";

export class GetUserByIdUseCase {
  constructor(private _userRepository: UserRepository) {}

  async execute(id: string) {
    return this._userRepository.findUserById(id);
  }
}
