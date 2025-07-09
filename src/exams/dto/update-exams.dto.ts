import { IsString, IsOptional, IsDate, Matches, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { LessonType } from '../../lessons/lesson.entity';
import { ExamType } from '../exams.entity';

export class ExamUpdateDto {
	@IsString()
	@IsOptional()
	subject?: string;

	@IsDate()
	@IsOptional()
	@Type(() => Date)
	date?: Date;

	@IsString()
	@IsOptional()
	@Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
		message: 'Время должно быть в формате HH:MM (24-часовой формат)',
	})
	start?: string;

	@IsString()
	@IsOptional()
	auditorium?: string;

	@IsString()
	@IsOptional()
	teacher?: string;

	@IsOptional()
	@IsEnum(ExamType, {
		message: `Тип занятия должен быть одним из: ${Object.values(LessonType).join(', ')}`,
	})
	examType?: ExamType;
}
