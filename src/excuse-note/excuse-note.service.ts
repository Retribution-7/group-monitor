import { inject, injectable } from 'inversify';
import { IExcuseNoteService } from './excuse-note.service.interface';
import { ExcuseNoteModel } from '../generated/prisma';
import { ExcuseNoteCreateDto } from './dto/create-excuse-note.dto';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';
import { TYPES } from '../types';
import { IExcuseNoteRepository } from './excuse-note.repository.interface';
import { ExcuseNote } from './excuse-note.entity';
import dayjs from 'dayjs';
@injectable()
export class ExcuseNoteService implements IExcuseNoteService {
	constructor(
		@inject(TYPES.ExcuseNoteRepository)
		private readonly excuseNoteRepository: IExcuseNoteRepository,
	) {}
	async createExcuseNote(dto: ExcuseNoteCreateDto): Promise<ExcuseNoteModel> {
		const excuseNote = new ExcuseNote(
			dto.studentId,
			dto.noteNumber,
			dayjs(dto.issueDate, 'DD.MM.YY').toDate(),
			dayjs(dto.illnessStart, 'DD.MM.YY').toDate(),
			dayjs(dto.illnessEnd, 'DD.MM.YY').toDate(),
			dayjs(dto.physicalEducationStart, 'DD.MM.YY').toDate(),
			dayjs(dto.physicalEducationEnd, 'DD.MM.YY').toDate(),
		);
		return this.excuseNoteRepository.create(excuseNote);
	}
	async find(studentId: number): Promise<ExcuseNoteModel[] | null> {
		return this.excuseNoteRepository.find(studentId);
	}
	async getAll(): Promise<ExcuseNoteModel[] | null> {
		return this.excuseNoteRepository.getAll();
	}
	async deleteExcuseNote(id: number): Promise<ExcuseNoteModel> {
		return this.excuseNoteRepository.delete(id);
	}
	async updateExcuseNote(id: number, dto: ExcuseNoteUpdateDto): Promise<ExcuseNoteModel> {
		return this.excuseNoteRepository.update(id, dto);
	}
}
