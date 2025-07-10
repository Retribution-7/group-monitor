import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { IStudentsController } from './students.controller.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IStudentsService } from './students.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { StudentUpdateDto } from './dto/update-student.dto';

@injectable()
export class StudentsController extends BaseController implements IStudentsController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.StudentsService) private readonly studentsService: IStudentsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/',
				func: this.create,
				method: 'post',
			},
			{
				path: '/',
				func: this.find as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'get',
			},
			{
				path: '/all',
				func: this.getAll as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'get',
			},
			{
				path: '/:recordNumber',
				func: this.update as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'patch',
			},
			{
				path: '/:recordNumber',
				func: this.delete as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'delete',
			},
		]);
	}

	async create({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const student = await this.studentsService.createStudent(body);

		if (!student) {
			return next(new HTTPError(422, 'Введены некорректные данные'));
		}
		this.ok(res, {
			recordNumber: body.recordNumber,
			firstName: body.firstName,
			lastName: body.lastName,
			fathersName: body.fathersName,
		});
	}

	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const name = req.query.name as string;

		if (!name) {
			return next(new HTTPError(400, 'Параметр search обязателен'));
		}

		const students = await this.studentsService.getStudents(name);

		if (students?.length === 0) {
			return next(new HTTPError(404, 'Студенты с таким именем не найдены'));
		}

		this.ok(res, students);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const exams = await this.studentsService.getAll();
		if (!exams) {
			return next(new HTTPError(404, 'Список студентов пуст'));
		}
		this.ok(res, exams);
	}

	async delete(
		req: Request<{ recordNumber: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const recordNumber = parseInt(req.params.recordNumber);
		if (!recordNumber) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const studentToDelete = await this.studentsService.deleteStudent(recordNumber);

		if (!studentToDelete) {
			return next(new HTTPError(404, 'Студент не найден'));
		}
		this.ok(res, { success: true });
	}

	async update(
		req: Request<{ recordNumber: string }, object, StudentUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const recordNumber = parseInt(req.params.recordNumber);
		if (!recordNumber) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const studentToUpdate = await this.studentsService.updateStudent(recordNumber, req.body);
		if (!studentToUpdate) {
			return next(new HTTPError(404, 'Студент не найден'));
		}
		this.ok(res, studentToUpdate);
	}
}
