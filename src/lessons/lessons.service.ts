import { inject, injectable } from 'inversify';
import { ILessonsService } from './lessons.service.interface';
import { LessonModel } from '../generated/prisma';
import { LessonCreateDto } from './dto/create-lesson.dto';
import { TYPES } from '../types';
import { ILessonsRepository } from './lessons.repository.interface';
import { Lesson, LessonType } from './lesson.entity';
import { LessonUpdateDto } from './dto/update-lesson.dto';
import { parseDate } from '../helpers/helpers';

@injectable()
export class LessonsService implements ILessonsService {
	constructor(
		@inject(TYPES.LessonsRepository) private readonly lessonsRepository: ILessonsRepository,
	) {}
	async createLesson(dto: LessonCreateDto): Promise<LessonModel> {
		const lesson = new Lesson(
			parseDate(dto.date.toISOString()),
			dto.start,
			dto.end,
			dto.subject,
			dto.teacher,
			dto.auditorium,
			dto.lessonsType as LessonType,
		);
		return this.lessonsRepository.create(lesson);
	}
	async getLessonsByDate(date: string): Promise<LessonModel[] | null> {
		return await this.lessonsRepository.find(date);
	}
	async deleteLesson(id: number): Promise<LessonModel> {
		return await this.lessonsRepository.delete(id);
	}

	async updateLesson(id: number, dto: LessonUpdateDto): Promise<LessonModel> {
		return await this.lessonsRepository.update(id, dto);
	}
}
