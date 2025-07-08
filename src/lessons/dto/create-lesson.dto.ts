import { IsDate, IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { LessonType } from '../lesson.entity';
import { Type } from 'class-transformer';

export class LessonCreateDto {
	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	date: Date;

	@IsString()
	@Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Время начала должно быть в формате HH:MM',
	})
	start: string;

	@IsString()
	@Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'Время окончания должно быть в формате HH:MM',
	})
	end: string;

	@IsString()
	@IsNotEmpty()
	@IsNotEmpty()
	subject: string;

	@IsString()
	@IsNotEmpty()
	teacher: string;

	@IsString()
	@IsNotEmpty()
	auditorium: string;

	@IsEnum(LessonType, {
		message: `Тип занятия должен быть одним из: ${Object.values(LessonType).join(', ')}`,
	})
	lessonsType: string;
}
