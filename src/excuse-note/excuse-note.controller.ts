import { inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { IExcuseNoteController } from './excuse-note.controller.interface';
import { TYPES } from '../types';
import { IExcuseNoteService } from './excuse-note.service.interface';
import { Request, Response, NextFunction } from 'express';
import { ILogger } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { ExcuseNoteUpdateDto } from './dto/update-excuse-note.dto';

export class ExcuseNoteController extends BaseController implements IExcuseNoteController {
	constructor(
		@inject(TYPES.ILogger) private readonly loggerService: ILogger,
		@inject(TYPES.ExcuseNoteService) private readonly excuseNoteService: IExcuseNoteService,
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
		const excuseNote = await this.excuseNoteService.createExcuseNote(body);

		if (!excuseNote) {
			return next(new HTTPError(404, 'Введены некорректные данные'));
		}
		this.ok(res, {
			studentID: excuseNote.studentId,
			noteNumber: excuseNote.noteNumber,
			issueDate: excuseNote.issueDate,
		});
	}
	async find(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.query.id as string;

		if (!id) {
			return next(new HTTPError(400, 'Не указан id в query-параметре'));
		}

		const excuseNote = await this.excuseNoteService.find(parseInt(id));
		if (!excuseNote) {
			return next(new HTTPError(422, 'У студента нет доуступных справок'));
		}
		this.ok(res, excuseNote);
	}
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const excuseNotes = await this.excuseNoteService.getAll();
		if (excuseNotes?.length == 0) {
			return next(new HTTPError(422, 'Нет доступных справок'));
		}
		this.ok(res, excuseNotes);
	}
	async delete(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
		const id = parseInt(req.params.id);
		if (!id) {
			return next(new HTTPError(400, 'Неверный формат ID'));
		}
		const excuseNoteToDelete = await this.excuseNoteService.deleteExcuseNote(id);
		if (!excuseNoteToDelete) {
			return next(new HTTPError(422, 'Справка не найдена'));
		}
		this.ok(res, { seccess: true });
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

		const excuseNoteToUpdate = await this.excuseNoteService.updateExcuseNote(id, req.body);
		if (!excuseNoteToUpdate) {
			return next(new HTTPError(422, 'Справка не найдена'));
		}
		this.ok(res, excuseNoteToUpdate);
	}
}
