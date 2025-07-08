import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { json } from 'body-parser';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { LessonsController } from './lessons/lessons.controller';
import { StudentsController } from './students/students.controller';
import { ExcuseNoteController } from './excuse-note/excuse-note.controller';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private readonly logger: ILogger,
		@inject(TYPES.UserController) private readonly userController: UserController,
		@inject(TYPES.LessonsController) private readonly lessonsController: LessonsController,
		@inject(TYPES.StudentsController) private readonly studentsController: StudentsController,
		@inject(TYPES.ExcuseNoteController) private readonly excuseNoteController: ExcuseNoteController,
		@inject(TYPES.ExeptionFilter) private readonly exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private readonly configService: IConfigService,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
		this.app.use('/lessons', this.lessonsController.router);
		this.app.use('/students', this.studentsController.router);
		this.app.use('/excuse-notes', this.excuseNoteController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
