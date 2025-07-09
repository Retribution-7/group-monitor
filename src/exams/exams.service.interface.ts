import { ExamModel } from '../generated/prisma';
import { ExamCreateDto } from './dto/create-exams.dto';
import { ExamUpdateDto } from './dto/update-exams.dto';

export interface IExamsService {
	createExam: (dto: ExamCreateDto) => Promise<ExamModel>;
	findExams: (date: Date) => Promise<ExamModel[] | null>;
	getAll: () => Promise<ExamModel[] | null>;
	deleteExam: (id: number) => Promise<ExamModel>;
	updateExam: (id: number, dto: ExamUpdateDto) => Promise<ExamModel>;
}
