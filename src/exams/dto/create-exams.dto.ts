import { IsString, IsNotEmpty, IsDate, Matches, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ExamType } from '../exams.entity';
import { LessonType } from '../../lessons/lesson.entity';

export class ExamCreateDto {
	@IsString()
	@IsNotEmpty()
	subject: string;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	date: Date;

	@IsString()
	@IsNotEmpty()
	@Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
		message: 'Время должно быть в формате HH:MM (24-часовой формат)',
	})
	start: string;

	@IsString()
	@IsNotEmpty()
	auditorium: string;

	@IsString()
	@IsNotEmpty()
	teacher: string;

	@IsEnum(ExamType, {
		message: `Тип занятия должен быть одним из: ${Object.values(LessonType).join(', ')}`,
	})
	examType: ExamType;
}
