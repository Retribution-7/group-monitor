import { StudentModel } from '../generated/prisma';
import { StudentCreateDto } from './dto/create-student.dto';
import { StudentUpdateDto } from './dto/update-student.dto';

export interface IStudentsService {
	createStudent: (dto: StudentCreateDto) => Promise<StudentModel>;
	getStudents: (name: string) => Promise<StudentModel[] | null>;
	deleteStudent: (id: number) => Promise<StudentModel>;
	updateStudent: (id: number, dto: StudentUpdateDto) => Promise<StudentModel>;
}
