import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'Не указан пароль' })
	password: string;

	@IsString({ message: 'Не указано имя' })
	firstName: string;

	@IsString({ message: 'Не указана фамилия' })
	lastName: string;

	@IsString({ message: 'Не указано отчество' })
	fathersName: string;
}
