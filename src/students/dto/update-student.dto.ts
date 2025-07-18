import {
	IsInt,
	Min,
	IsString,
	IsEmail,
	IsOptional,
	IsArray,
	ValidateNested,
	IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ParentDto } from './parent.dto';
import { IsValidPhoneNumber } from '../../helpers/helpers';

export class StudentUpdateDto {
	@IsOptional()
	@IsInt({ message: 'Номер записи должен быть целым числом' })
	@Min(1, { message: 'Номер записи должен быть положительным числом' })
	recordNumber?: number;

	@IsOptional()
	@IsString()
	firstName?: string;

	@IsOptional()
	@IsString()
	lastName?: string;

	@IsOptional()
	@IsString()
	fathersName?: string;

	@IsOptional()
	@IsIn([1, 2], { message: 'Подгруппа должна быть 1 или 2' })
	subgroup: number;

	@IsOptional()
	@IsEmail({}, { message: 'Неверно указан email' })
	email?: string;

	@IsOptional()
	@IsValidPhoneNumber()
	phone?: string;

	@IsOptional()
	@IsString()
	address?: string;

	@IsOptional()
	@IsString()
	systemPassword?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ParentDto)
	parents?: ParentDto[];
}
