import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { LessonType } from '../lesson.entity';

export class LessonUpdateDto {
	@IsOptional()
	@IsDate()
	date?: Date;

	@IsOptional()
	@IsString()
	@Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Время начала должно быть в формате HH:MM',
	})
	start?: string;

	@IsOptional()
	@IsString()
	@Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Время окончания должно быть в формате HH:MM',
	})
	end?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	subject?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	teacher?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	auditorium?: string;

	@IsOptional()
	@IsEnum(LessonType, {
		message: `Тип занятия должен быть одним из: ${Object.values(LessonType).join(', ')}`,
	})
	lessonsType?: LessonType;
}
