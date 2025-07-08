import { inject, injectable } from 'inversify';
import { IExcuseNoteService } from './excuse-note.service.interface';
import { ExcuseNoteModel } from '../generated/prisma';
import { ExcuseNoteCreateDto } from './dto/create-excuse-note.dto';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';
import { TYPES } from '../types';
import { IExcuseNoteRepository } from './excuse-note.repository.interface';
import { ExcuseNote } from './excuse-note.entity';

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
			new Date(dto.issueDate),
			new Date(dto.illnessStart),
			new Date(dto.illnessEnd),
			new Date(dto.physicalEducationStart),
			new Date(dto.physicalEducationEnd),
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
