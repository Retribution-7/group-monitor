import { StudentModel } from '../generated/prisma';
import { StudentUpdateDto } from './dto/update-student.dto';
import { Student } from './students.entity';

export interface IStudentsRerository {
	create: (student: Student) => Promise<StudentModel>;
	find: (name: string) => Promise<StudentModel[] | null>;
	delete: (id: number) => Promise<StudentModel>;
	update: (id: number, dto: StudentUpdateDto) => Promise<StudentModel>;
}
