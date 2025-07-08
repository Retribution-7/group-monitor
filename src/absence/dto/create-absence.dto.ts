import { IsInt, IsNotEmpty, IsEnum, IsString, IsOptional, IsDate } from 'class-validator';
import { AbsenceStatusType } from '../absence.entity';
import { Type } from 'class-transformer';

export class AbsenceCreateDto {
	@IsInt()
	@IsNotEmpty()
	studentId: number;

	@IsInt()
	missedClasses: number;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	absenceDate: Date;

	@IsEnum(AbsenceStatusType, {
		message: 'Status must be either "valid" or "unvalid"',
	})
	status: AbsenceStatusType;

	@IsString()
	@IsOptional()
	comment?: string;
}
