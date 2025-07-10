import { inject, injectable } from 'inversify';
import { StudentModel } from '../generated/prisma';
import { StudentUpdateDto } from './dto/update-student.dto';
import { Student } from './students.entity';
import { IStudentsRerository } from './students.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';

@injectable()
export class StudentsRepository implements IStudentsRerository {
	constructor(@inject(TYPES.PrismaService) private readonly prismaService: PrismaService) {}
	create({
		recordNumber,
		firstName,
		lastName,
		fathersName,
		subgroup,
		email,
		phone,
		address,
		systemPassword,
		parents,
	}: Student): Promise<StudentModel> {
		return this.prismaService.client.studentModel.create({
			data: {
				recordNumber,
				firstName,
				lastName,
				fathersName,
				subgroup,
				email,
				phone,
				address,
				systemPassword,
				parents,
			},
		});
	}
	async find(name: string): Promise<StudentModel[] | null> {
		const searchTerm = name.trim().replace(/'/g, "''");

		const students = await this.prismaService.client.$queryRaw<StudentModel[]>`
  SELECT * FROM "StudentModel"
  WHERE LOWER(CONCAT("firstName", ' ', "lastName", ' ', "fathersName")) LIKE LOWER(${`%${searchTerm}%`})
`;

		return students.length > 0 ? students : null;
	}

	async getAll(): Promise<StudentModel[] | null> {
		return this.prismaService.client.studentModel.findMany();
	}

	delete(recordNumber: number): Promise<StudentModel> {
		return this.prismaService.client.studentModel.delete({
			where: { recordNumber },
		});
	}
	update(recordNumber: number, dto: StudentUpdateDto): Promise<StudentModel> {
		const updateData: any = {};

		if (dto.recordNumber) updateData.recordNumber = dto.recordNumber;
		if (dto.firstName) updateData.firstName = dto.firstName;
		if (dto.lastName) updateData.lastName = dto.lastName;
		if (dto.fathersName) updateData.fathersName = dto.fathersName;
		if (dto.email) updateData.email = dto.email;
		if (dto.subgroup) updateData.subgroup = dto.subgroup;
		if (dto.phone) updateData.phone = dto.phone;
		if (dto.address) updateData.address = dto.address;
		if (dto.systemPassword) updateData.systemPassword = dto.systemPassword;
		if (dto.parents) updateData.parents = dto.parents;

		return this.prismaService.client.studentModel.update({
			where: { recordNumber },
			data: updateData,
		});
	}
}
