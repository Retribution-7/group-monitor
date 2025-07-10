import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches, Max, Min } from 'class-validator';
import { LessonType, weekDayType, weekType } from '../lesson.entity';

export class LessonCreateDto {
	@IsEnum(weekDayType, {
		message: `День недели должен быть одним из: ${Object.values(weekDayType).join(', ')}`,
	})
	weekDay: weekDayType;

	@IsEnum(weekType, {
		message: `Тип повторения должен быть одним из: ${Object.values(weekType).join(', ')}`,
	})
	weekType: weekType;
	@IsNumber({}, { message: 'Подгруппа должна быть числом' })
	@Min(1, { message: 'Подгруппа должна быть не меньше 1' })
	@Max(2, { message: 'Подгруппа должна быть не больше 2' })
	subgroup: number;

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
