import { StudentModel } from '../generated/prisma';
import { StudentCreateDto } from './dto/create-student.dto';
import { StudentUpdateDto } from './dto/update-student.dto';

export interface IStudentsService {
	createStudent: (dto: StudentCreateDto) => Promise<StudentModel>;
	getStudents: (name: string) => Promise<StudentModel[] | null>;
	deleteStudent: (recordNumber: number) => Promise<StudentModel>;
	updateStudent: (recordNumber: number, dto: StudentUpdateDto) => Promise<StudentModel>;
}
