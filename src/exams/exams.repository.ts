import { inject, injectable } from 'inversify';
import { IExamsRepository } from './exams.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { ExamModel } from '../generated/prisma';
import { ExamUpdateDto } from './dto/update-exams.dto';
import { Exam } from './exams.entity';

@injectable()
export class ExamsRepository implements IExamsRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}
	async create({ subject, date, start, auditorium, teacher, examType }: Exam): Promise<ExamModel> {
		return this.prismaService.client.examModel.create({
			data: {
				subject,
				date,
				start,
				teacher,
				auditorium,
				examType,
			},
		});
	}
	async find(date: Date): Promise<ExamModel[] | null> {
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);

		return this.prismaService.client.examModel.findMany({
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
	async getAll(): Promise<ExamModel[] | null> {
		return this.prismaService.client.examModel.findMany();
	}
	async delete(id: number): Promise<ExamModel> {
		return this.prismaService.client.examModel.delete({
			where: { id },
		});
	}
	async update(id: number, dto: ExamUpdateDto): Promise<ExamModel> {
		const updateData: any = {};
		if (dto.subject) updateData.subject = dto.subject;
		if (dto.date) updateData.date = dto.date;
		if (dto.start) updateData.start = dto.start;
		if (dto.auditorium) updateData.auditorium = dto.auditorium;
		if (dto.teacher) updateData.teacher = dto.teacher;
		if (dto.examType) updateData.examType = dto.examType;
		return this.prismaService.client.examModel.update({
			where: { id },
			data: updateData,
		});
	}
}
