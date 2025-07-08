import { IsEnum, IsString } from 'class-validator';
import { IsValidPhoneNumber } from '../../helpers/helpers';

export enum ParentType {
	MOTHER = 'mother',
	FATHER = 'father',
}
export class ParentDto {
	@IsString()
	name: string;

	@IsValidPhoneNumber()
	phone: string;

	@IsEnum(ParentType, {
		message: `Тип занятия должен быть одним из: ${Object.values(ParentType).join(', ')}`,
	})
	relation: ParentType;
}
