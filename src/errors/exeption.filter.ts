import { NextFunction, Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private readonly logger: ILogger) {
		this.logger = logger;
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
