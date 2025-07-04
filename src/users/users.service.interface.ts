import { UserModel } from '../generated/prisma';
import { UserLoginDto } from './dto/users-login.dto';
import { UserRegisterDto } from './dto/users-register.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean | null>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
