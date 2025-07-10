import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { ILessonsController } from './lessons.controller.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { ILessonsService } from './lessons.service.interface';
import { TYPES } from '../types';
import { LessonCreateDto } from './dto/create-lesson.dto';
import { HTTPError } from '../errors/http-error.class';
import { LessonUpdateDto } from './dto/update-lesson.dto';

@injectable()
export class LessonsController extends BaseController implements ILessonsController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.LessonsService) private readonly lessonsService: ILessonsService,
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
				func: this.getByDate as unknown as (
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
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const lessons = await this.lessonsService.getAll();
		if (!lessons) {
			return next(new HTTPError(404, 'Список пар пуст'));
		}
		this.ok(res, lessons);
	}

	async create(
		{ body }: Request<object, object, LessonCreateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const lesson = await this.lessonsService.createLesson(body);
		if (!lesson) {
			return next(new HTTPError(422, 'Введены некорректные данные'));
		}
		this.ok(res, {
			start: lesson.start,
			end: lesson.end,
			subject: lesson.subject,
			teacher: lesson.teacher,
			auditorium: lesson.auditorium,
		});
	}

	async getByDate(
		req: Request<object, object, object, { date?: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { date } = req.query;

		if (!date) {
			return next(new HTTPError(400, 'Не указана дата в query-параметре'));
		}

		const lessons = await this.lessonsService.getLessonsByDate(date);

		if (!lessons || lessons.length === 0) {
			return next(new HTTPError(404, 'Пар в заданную дату нет'));
		}

		this.ok(res, lessons);
	}

	async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const lessonToDelete = await this.lessonsService.deleteLesson(id);
		if (!lessonToDelete) {
			return next(new HTTPError(404, 'Пар с заданным ID нет'));
		}
		this.ok(res, { success: true });
	}

	async update(
		req: Request<{ id: string }, object, LessonUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const updatedLesson = await this.lessonsService.updateLesson(id, req.body);
		if (!updatedLesson) {
			return next(new HTTPError(404, 'Нет пары с указанным ID'));
		}
		this.ok(res, updatedLesson);
	}
}
