import { inject, injectable } from 'inversify';
import { LessonModel } from '../generated/prisma';
import { Lesson } from './lesson.entity';
import { ILessonsRepository } from './lessons.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { LessonUpdateDto } from './dto/update-lesson.dto';
import { parseDate } from '../helpers/helpers';

@injectable()
export class LessonsRepository implements ILessonsRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}
	create({
		date,
		start,
		end,
		subject,
		teacher,
		auditorium,
		lessonsType,
	}: Lesson): Promise<LessonModel> {
		return this.prismaService.client.lessonModel.create({
			data: {
				date,
				start,
				end,
				subject,
				teacher,
				auditorium,
				lessonsType,
			},
		});
	}

	async find(date: string): Promise<LessonModel[] | null> {
		const startOfDay = new Date(parseDate(date));
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(parseDate(date));
		endOfDay.setHours(23, 59, 59, 999);

		return this.prismaService.client.lessonModel.findMany({
			where: {
				date: {
					gte: startOfDay,
					lte: endOfDay,
				},
			},
			orderBy: {
				date: 'asc',
			},
		});
	}

	async delete(id: number): Promise<LessonModel> {
		return this.prismaService.client.lessonModel.delete({
			where: { id },
		});
	}

	async update(id: number, dto: LessonUpdateDto): Promise<LessonModel> {
		const updateData: any = {};

		if (dto.date) updateData.date = new Date(dto.date);
		if (dto.start) updateData.start = dto.start;
		if (dto.end) updateData.end = dto.end;
		if (dto.subject) updateData.subject = dto.subject;
		if (dto.teacher) updateData.teacher = dto.teacher;
		if (dto.auditorium) updateData.auditorium = dto.auditorium;
		if (dto.lessonsType) updateData.lessonsType = dto.lessonsType;

		return this.prismaService.client.lessonModel.update({
			where: { id },
			data: updateData,
		});
	}
}
