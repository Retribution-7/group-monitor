import { inject, injectable } from 'inversify';
import { ExcuseNoteModel } from '../generated/prisma';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';
import { ExcuseNote } from './excuse-note.entity';
import { IExcuseNoteRepository } from './excuse-note.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class ExcuseNoteRepository implements IExcuseNoteRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}
	async create({
		studentId,
		noteNumber,
		issueDate,
		illnessStart,
		illnessEnd,
		physicalEducationStart,
		physicalEducationEnd,
	}: ExcuseNote): Promise<ExcuseNoteModel> {
		const isoiIssueDate = issueDate.toISOString();
		const isoIllnessStart = illnessStart.toISOString();
		const isoIllnessEnd = illnessEnd.toISOString();
		const isoPhysicalEducationStart = physicalEducationStart.toISOString();
		const isoPhysicalEducationEnd = physicalEducationEnd.toISOString();
		return this.prismaService.client.excuseNoteModel.create({
			data: {
				studentId,
				noteNumber,
				issueDate: isoiIssueDate,
				illnessStart: isoIllnessStart,
				illnessEnd: isoIllnessEnd,
				physicalEducationStart: isoPhysicalEducationStart,
				physicalEducationEnd: isoPhysicalEducationEnd,
			},
		});
	}

	async find(studentId: number): Promise<ExcuseNoteModel[] | null> {
		return this.prismaService.client.excuseNoteModel.findMany({
			where: { studentId },
		});
	}

	async getAll(): Promise<ExcuseNoteModel[] | null> {
		const currentYear = new Date().getFullYear();
		const previousYear = new Date(`${currentYear - 1}-01-01T00:00:00.000Z`);
		return this.prismaService.client.excuseNoteModel.findMany({
			where: {
				issueDate: {
					gte: previousYear,
				},
			},
		});
	}

	async delete(id: number): Promise<ExcuseNoteModel> {
		return this.prismaService.client.excuseNoteModel.delete({
			where: { id },
		});
	}

	async update(id: number, dto: ExcuseNoteUpdateDto): Promise<ExcuseNoteModel> {
		const updateData: any = {};
		if (dto.studentId) updateData.studentId = dto.studentId;
		if (dto.noteNumber) updateData.noteNumber = dto.noteNumber;
		if (dto.issueDate) updateData.issueDate = dto.issueDate;
		if (dto.illnessStart) updateData.illnessStart = dto.illnessStart;
		if (dto.illnessEnd) updateData.illnessEnd = dto.illnessEnd;
		if (dto.physicalEducationStart) updateData.physicalEducationStart = dto.physicalEducationStart;
		if (dto.physicalEducationEnd) updateData.physicalEducationEnd = dto.physicalEducationEnd;
		return this.prismaService.client.excuseNoteModel.update({
			where: { id },
			data: updateData,
		});
	}
}
