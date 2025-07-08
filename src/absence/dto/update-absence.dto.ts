import { IsInt, IsNotEmpty, IsEnum, IsString, IsOptional, IsDate } from 'class-validator';
import { AbsenceStatusType } from '../absence.entity';
import { Type } from 'class-transformer';

export class AbsenceUpdateDto {
	@IsOptional()
	@IsInt()
	@IsNotEmpty()
	studentId?: number;

	@IsOptional()
	@IsInt()
	missedClasses?: number;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	absenceDate?: Date;

	@IsOptional()
	@IsEnum(AbsenceStatusType, {
		message: 'Status must be either "valid" or "unvalid"',
	})
	status?: AbsenceStatusType;

	@IsOptional()
	@IsString()
	comment?: string;
}
