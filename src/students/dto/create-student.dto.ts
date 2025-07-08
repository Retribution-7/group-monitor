import { Type } from 'class-transformer';
import {
	IsArray,
	IsEmail,
	IsIn,
	IsInt,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';
import { ParentDto } from './parent.dto';
import { IsValidPhoneNumber } from '../../helpers/helpers';

export class StudentCreateDto {
	@IsInt({ message: 'Номер записи должен быть целым числом' })
	@Min(1, { message: 'Номер записи должен быть положительным числом' })
	recordNumber: number;

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	fathersName: string;

	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsValidPhoneNumber()
	phone: string;

	@IsIn([1, 2], { message: 'Подгруппа должна быть 1 или 2' })
	subgroup: number;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ParentDto)
	parents?: ParentDto[];
}
