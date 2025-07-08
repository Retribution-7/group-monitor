import {
	IsInt,
	IsNotEmpty,
	IsString,
	Matches,
	IsDate,
	Validate,
	MinDate,
	IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ExcuseNoteUpdateDto {
	@IsOptional()
	@IsInt()
	@IsNotEmpty()
	studentId?: number;

	@IsOptional()
	@IsString()
	@Matches(/^[A-Za-z0-9-]+$/, {
		message: 'Номер справки должен содержать только буквы, цифры и дефисы',
	})
	noteNumber?: string;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	issueDate?: Date;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	illnessStart?: Date;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@Validate(MinDate, ['illnessStart'], {
		message: 'Дата окончания болезни должна быть после даты начала',
	})
	illnessEnd?: Date;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	physicalEducationStart?: Date;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@Validate(MinDate, ['physicalEducationStart'], {
		message: 'Дата окончания освобождения должна быть после даты начала',
	})
	physicalEducationEnd?: Date;
}
