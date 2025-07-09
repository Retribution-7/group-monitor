import { inject, injectable } from 'inversify';
import { IUserService } from './users.service.interface';
import { User } from './user.entity';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '../generated/prisma';
import { UserLoginDto } from './dto/users-login.dto';
import { UserRegisterDto } from './dto/users-register.dto';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.UsersRepository) private readonly usersRepository: IUsersRepository,
	) {}

	async createUser({
		email,
		password,
		firstName,
		lastName,
		fathersName,
	}: UserRegisterDto): Promise<UserModel | null> {
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}

		const newUser = new User({
			email,
			firstName,
			lastName,
			fathersName,
		});

		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);

		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		const newUser = new User({
			email: existedUser.email,
			firstName: existedUser.firstName ?? undefined,
			lastName: existedUser.lastName ?? undefined,
			fathersName: existedUser.fathersName ?? undefined,
			passwordHash: existedUser.password,
		});
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
