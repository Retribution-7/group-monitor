import { ExamModel } from '../generated/prisma';
import { ExamUpdateDto } from './dto/update-exams.dto';
import { Exam } from './exams.entity';

export interface IExamsRepository {
	create: (exam: Exam) => Promise<ExamModel>;
	find: (date: Date) => Promise<ExamModel[] | null>;
	getAll: () => Promise<ExamModel[] | null>;
	delete: (id: number) => Promise<ExamModel>;
	update: (id: number, dto: ExamUpdateDto) => Promise<ExamModel>;
}
