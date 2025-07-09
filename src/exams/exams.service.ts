import { inject, injectable } from 'inversify';
import { IExamsService } from './exams.service.interface';
import { ExamModel } from '../generated/prisma';
import { ExamCreateDto } from './dto/create-exams.dto';
import { ExamUpdateDto } from './dto/update-exams.dto';
import { Exam } from './exams.entity';
import dayjs from 'dayjs';
import { TYPES } from '../types';
import { IExamsRepository } from './exams.repository.interface';

@injectable()
export class ExamsService implements IExamsService {
	constructor(@inject(TYPES.ExamsRepository) private readonly examsRepository: IExamsRepository) {}
	createExam(dto: ExamCreateDto): Promise<ExamModel> {
		const exam = new Exam(
			dto.subject,
			dayjs(dto.date, 'DD.MM.YY').toDate(),
			dto.start,
			dto.auditorium,
			dto.teacher,
			dto.examType,
		);
		return this.examsRepository.create(exam);
	}
	findExams(date: Date): Promise<ExamModel[] | null> {
		return this.examsRepository.find(date);
	}
	getAll(): Promise<ExamModel[] | null> {
		return this.examsRepository.getAll();
	}
	deleteExam(id: number): Promise<ExamModel> {
		return this.examsRepository.delete(id);
	}
	updateExam(id: number, dto: ExamUpdateDto): Promise<ExamModel> {
		return this.examsRepository.update(id, dto);
	}
}
