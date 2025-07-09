import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IExamsController } from './exams.controller.interface';
import { TYPES } from '../types';
import { IExamsService } from './exams.service.interface';
import { Request, Response, NextFunction } from 'express';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import dayjs from 'dayjs';
import { ExamUpdateDto } from './dto/update-exams.dto';

@injectable()
export class ExamsController extends BaseController implements IExamsController {
	constructor(
		@inject(TYPES.ExamsService) private readonly examsService: IExamsService,
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
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
				path: '/:id',
				func: this.update as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'patch',
			},
			{
				path: '/:id',
				func: this.delete as unknown as (
					req: Request,
					res: Response,
					next: NextFunction,
				) => Promise<void>,
				method: 'delete',
			},
		]);
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		const exam = await this.examsService.createExam(req.body);
		if (!exam) {
			return next(new HTTPError(422, 'Введены некорректные данные'));
		}
		this.ok(res, exam);
	}

	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const date = req.query.date;

		if (!date || typeof date !== 'string') {
			return next(new HTTPError(400, 'Не указана дата в query-параметре'));
		}
		const parsedDate = dayjs(date, 'DD.MM.YY');

		if (!parsedDate.isValid()) {
			return next(new HTTPError(422, 'Неверный формат даты. Ожидается DD.MM.YY'));
		}

		const exams = await this.examsService.findExams(parsedDate.toDate());
		if (!exams) {
			return next(new HTTPError(404, 'Экзамены с указанной датой не найдены'));
		}
		this.ok(res, exams);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const exams = await this.examsService.getAll();
		if (!exams) {
			return next(new HTTPError(404, 'Список экзаменов пуст'));
		}
		this.ok(res, exams);
	}

	async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const exam = await this.examsService.deleteExam(id);
		if (!exam) {
			return next(new HTTPError(404, 'Экзамен не найден'));
		}
		this.ok(res, exam);
	}

	async update(
		req: Request<{ id: string }, object, ExamUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const exam = await this.examsService.updateExam(id, req.body);
		if (!exam) {
			return next(new HTTPError(404, 'Экзамен не найден'));
		}
		this.ok(res, exam);
	}
}
