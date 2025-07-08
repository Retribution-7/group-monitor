import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import { IAbsenceController } from './absence.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IAbsenceService } from './absence.service.interface';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { ExcuseNoteUpdateDto } from '../excuse-note/dto/update-excuse-note.dto';

@injectable()
export class AbsenceController extends BaseController implements IAbsenceController {
	constructor(
		@inject(TYPES.AbsenceService) private readonly absenceService: IAbsenceService,
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

	async create({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const absence = await this.absenceService.createAbsence(body);
		if (!absence) {
			return next(new HTTPError(422, 'Введены некорректные данные'));
		}
		this.ok(res, absence);
	}

	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.query.id as string;

		if (!id) {
			return next(new HTTPError(400, 'Не указан id в query-параметре'));
		}

		const absences = await this.absenceService.findAbsence(parseInt(id));
		if (!absences || absences.length == 0) {
			return next(new HTTPError(404, 'У выбранного студента нет пропусков'));
		}
		this.ok(res, absences);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const absences = await this.absenceService.getAll();
		if (!absences || absences.length == 0) {
			return next(new HTTPError(404, 'Нет доступных пропусков'));
		}
		this.ok(res, absences);
	}

	async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}

		const absence = await this.absenceService.deleteAbsence(id);
		if (!absence) {
			return next(new HTTPError(404, 'Пропуск не найден'));
		}
		this.ok(res, { success: true });
	}

	async update(
		req: Request<{ id: string }, object, ExcuseNoteUpdateDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}
		const absence = await this.absenceService.updateAbsence(id, req.body);
		if (!absence) {
			return next(new HTTPError(404, 'Пропуск не найден'));
		}
		this.ok(res, absence);
	}
}
