import { inject, injectable } from 'inversify';
import { IStudentsService } from './students.service.interface';
import { StudentModel } from '../generated/prisma';
import { StudentCreateDto } from './dto/create-student.dto';
import { StudentUpdateDto } from './dto/update-student.dto';
import { TYPES } from '../types';
import { Student } from './students.entity';
import { IStudentsRerository } from './students.repository.interface';

@injectable()
export class StudentsService implements IStudentsService {
	constructor(
		@inject(TYPES.StudentsRepository) private readonly studentsRepository: IStudentsRerository,
	) {}
	createStudent(dto: StudentCreateDto): Promise<StudentModel> {
		const student = new Student(
			dto.recordNumber,
			dto.firstName,
			dto.lastName,
			dto.fathersName,
			dto.subgroup,
			dto.email,
			dto.phone,
			JSON.stringify(dto.parents),
		);
		return this.studentsRepository.create(student);
	}

	getStudents(name: string): Promise<StudentModel[] | null> {
		return this.studentsRepository.find(name);
	}
	deleteStudent(id: number): Promise<StudentModel> {
		return this.studentsRepository.delete(id);
	}
	updateStudent(id: number, dto: StudentUpdateDto): Promise<StudentModel> {
		return this.studentsRepository.update(id, dto);
	}
}
