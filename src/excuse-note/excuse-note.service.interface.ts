import { ExcuseNoteModel } from '../generated/prisma';
import { ExcuseNoteCreateDto } from './dto/create-excuse-note.dto';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';

export interface IExcuseNoteService {
	createExcuseNote: (dto: ExcuseNoteCreateDto) => Promise<ExcuseNoteModel>;
	find: (studentId: number) => Promise<ExcuseNoteModel[] | null>;
	getAll: () => Promise<ExcuseNoteModel[] | null>;
	deleteExcuseNote: (id: number) => Promise<ExcuseNoteModel>;
	updateExcuseNote: (id: number, dto: ExcuseNoteUpdateDto) => Promise<ExcuseNoteModel>;
}
