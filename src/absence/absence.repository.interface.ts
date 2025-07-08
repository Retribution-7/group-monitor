import { AbsenceModel } from '../generated/prisma';
import { Absence } from './absence.entity';
import { AbsenceUpdateDto } from './dto/update-absence.dto';

export interface IAbsenceRepository {
	create: (absence: Absence) => Promise<AbsenceModel>;
	find: (studentId: number) => Promise<AbsenceModel[] | null>;
	getAll: () => Promise<AbsenceModel[] | null>;
	delete: (id: number) => Promise<AbsenceModel>;
	update: (id: number, dto: AbsenceUpdateDto) => Promise<AbsenceModel>;
}
