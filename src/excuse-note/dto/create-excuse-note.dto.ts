import { IsInt, IsNotEmpty, IsString, Matches, IsDate, Validate, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ExcuseNoteCreateDto {
	@IsInt()
	@IsNotEmpty()
	studentId: number;

	@IsString()
	@Matches(/^[A-Za-z0-9-]+$/, {
		message: 'Номер справки должен содержать только буквы, цифры и дефисы',
	})
	noteNumber: string;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	issueDate: Date;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	illnessStart: Date;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@Validate(MinDate, ['illnessStart'], {
		message: 'Дата окончания болезни должна быть после даты начала',
	})
	illnessEnd: Date;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	physicalEducationStart: Date;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@Validate(MinDate, ['physicalEducationStart'], {
		message: 'Дата окончания освобождения должна быть после даты начала',
	})
	physicalEducationEnd: Date;
}
