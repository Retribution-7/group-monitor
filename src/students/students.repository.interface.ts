import { StudentModel } from '../generated/prisma';
import { StudentUpdateDto } from './dto/update-student.dto';
import { Student } from './students.entity';

export interface IStudentsRerository {
	create: (student: Student) => Promise<StudentModel>;
	find: (name: string) => Promise<StudentModel[] | null>;
	getAll: () => Promise<StudentModel[] | null>;
	delete: (recordNumber: number) => Promise<StudentModel>;
	update: (recordNumber: number, dto: StudentUpdateDto) => Promise<StudentModel>;
}
