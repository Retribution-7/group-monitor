import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './logger/logger.interface';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.ExeptionFilter) private readonly exeptionFilter: IExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}
	useRoutes(): void {}
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useExeptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
