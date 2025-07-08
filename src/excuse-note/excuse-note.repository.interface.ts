import { ExcuseNoteModel } from '../generated/prisma';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';
import { ExcuseNote } from './excuse-note.entity';

export interface IExcuseNoteRepository {
	create: (excuseNote: ExcuseNote) => Promise<ExcuseNoteModel>;
	find: (studentId: number) => Promise<ExcuseNoteModel[] | null>;
	getAll: () => Promise<ExcuseNoteModel[] | null>;
	delete: (id: number) => Promise<ExcuseNoteModel>;
	update: (id: number, dto: ExcuseNoteUpdateDto) => Promise<ExcuseNoteModel>;
}
