import { inject, injectable } from 'inversify';
import { AbsenceModel } from '../generated/prisma';
import { Absence } from './absence.entity';
import { IAbsenceRepository } from './absence.repository.interface';
import { AbsenceUpdateDto } from './dto/update-absence.dto';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import dayjs from 'dayjs';

@injectable()
export class AbsenceRepository implements IAbsenceRepository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}

	async create({
		studentId,
		missedClasses,
		absenceDate,
		status,
		comment,
	}: Absence): Promise<AbsenceModel> {
		const data: any = {
			studentId,
			missedClasses,
			absenceDate,
			status,
		};
		if (comment !== undefined) {
			data.comment = comment;
		}
		return this.prismaService.client.absenceModel.create({ data });
	}

	async find(studentId: number): Promise<AbsenceModel[] | null> {
		return this.prismaService.client.absenceModel.findMany({
			where: { studentId },
		});
	}

	async getAll(): Promise<AbsenceModel[] | null> {
		return this.prismaService.client.absenceModel.findMany();
	}

	async delete(id: number): Promise<AbsenceModel> {
		return this.prismaService.client.absenceModel.delete({
			where: { id },
		});
	}

	async update(id: number, dto: AbsenceUpdateDto): Promise<AbsenceModel> {
		const updateData: any = {};
		if (dto.studentId) updateData.studentId = dto.studentId;
		if (dto.missedClasses) updateData.missedClasses = dto.missedClasses;
		if (dto.absenceDate) updateData.absenceDate = dayjs(dto.absenceDate, 'DD.MM.YY').toDate();
		if (dto.status) updateData.status = dto.status;
		if (dto.comment) updateData.comment = dto.comment;
		return this.prismaService.client.absenceModel.update({
			where: { id },
			data: updateData,
		});
	}
}
