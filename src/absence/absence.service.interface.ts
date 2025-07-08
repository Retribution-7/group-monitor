import { AbsenceModel } from '../generated/prisma';
import { AbsenceCreateDto } from './dto/create-absence.dto';
import { AbsenceUpdateDto } from './dto/update-absence.dto';

export interface IAbsenceService {
	createAbsence: (dto: AbsenceCreateDto) => Promise<AbsenceModel>;
	findAbsence: (studentId: number) => Promise<AbsenceModel[] | null>;
	getAll: () => Promise<AbsenceModel[] | null>;
	deleteAbsence: (id: number) => Promise<AbsenceModel>;
	updateAbsence: (id: number, dto: AbsenceUpdateDto) => Promise<AbsenceModel>;
}
