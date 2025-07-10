import { inject, injectable } from 'inversify';
import { LessonModel } from '../generated/prisma';
import { Lesson } from './lesson.entity';
import { ILessonsRepository } from './lessons.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { LessonUpdateDto } from './dto/update-lesson.dto';

@injectable()
export class LessonsRepository implements ILessonsRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}
	create({
		weekDay,
		weekType,
		start,
		end,
		subject,
		teacher,
		auditorium,
		lessonsType,
		subgroup,
	}: Lesson): Promise<LessonModel> {
		const data: any = {
			weekDay,
			weekType,
			start,
			end,
			subject,
			teacher,
			auditorium,
			lessonsType,
		};
		if (subgroup !== undefined) {
			data.subgroup = subgroup;
		}
		return this.prismaService.client.lessonModel.create({
			data: data,
		});
	}

	async find(weekDay: string): Promise<LessonModel[] | null> {
		return this.prismaService.client.lessonModel.findMany({
			where: { weekDay },
		});
	}

	async getAll(): Promise<LessonModel[] | null> {
		return this.prismaService.client.lessonModel.findMany();
	}

	async delete(id: number): Promise<LessonModel> {
		return this.prismaService.client.lessonModel.delete({
			where: { id },
		});
	}

	async update(id: number, dto: LessonUpdateDto): Promise<LessonModel> {
		const updateData: any = {};

		if (dto.weekDay) updateData.weekDay = dto.weekDay;
		if (dto.weekType) updateData.weekType = dto.weekType;
		if (dto.start) updateData.start = dto.start;
		if (dto.end) updateData.end = dto.end;
		if (dto.subject) updateData.subject = dto.subject;
		if (dto.teacher) updateData.teacher = dto.teacher;
		if (dto.auditorium) updateData.auditorium = dto.auditorium;
		if (dto.lessonsType) updateData.lessonsType = dto.lessonsType;
		if (dto.subgroup) updateData.subgroup = dto.subgroup;

		return this.prismaService.client.lessonModel.update({
			where: { id },
			data: updateData,
		});
	}
}
