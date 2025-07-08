import { inject, injectable } from 'inversify';
import { IAbsenceService } from './absence.service.interface';
import { TYPES } from '../types';
import { IAbsenceRepository } from './absence.repository.interface';
import { AbsenceModel } from '../generated/prisma';
import { AbsenceCreateDto } from './dto/create-absence.dto';
import { AbsenceUpdateDto } from './dto/update-absence.dto';
import { Absence } from './absence.entity';
import dayjs from 'dayjs';

@injectable()
export class AbsenceService implements IAbsenceService {
	constructor(
		@inject(TYPES.AbsenceRepository) private readonly absenceRepository: IAbsenceRepository,
	) {}
	async createAbsence(dto: AbsenceCreateDto): Promise<AbsenceModel> {
		const absence = new Absence(
			dto.studentId,
			dto.missedClasses,
			dayjs(dto.absenceDate, 'DD.MM.YY').toDate(),
			dto.status,
			dto.comment ?? '',
		);
		return this.absenceRepository.create(absence);
	}
	async findAbsence(studentId: number): Promise<AbsenceModel[] | null> {
		return this.absenceRepository.find(studentId);
	}
	async getAll(): Promise<AbsenceModel[] | null> {
		return this.absenceRepository.getAll();
	}
	async deleteAbsence(id: number): Promise<AbsenceModel> {
		return this.absenceRepository.delete(id);
	}
	async updateAbsence(id: number, dto: AbsenceUpdateDto): Promise<AbsenceModel> {
		return this.absenceRepository.update(id, dto);
	}
}
