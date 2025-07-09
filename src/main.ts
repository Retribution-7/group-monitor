import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserController } from './users/users.controller.interface';
import { IUserService } from './users/users.service.interface';
import { UserService } from './users/users.service';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';
import { LessonsRepository } from './lessons/lessons.repository';
import { LessonsService } from './lessons/lessons.service';
import { LessonsController } from './lessons/lessons.controller';
import { StudentsRepository } from './students/students.repository';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { ExcuseNoteRepository } from './excuse-note/excuse-note.repository';
import { ExcuseNoteService } from './excuse-note/excuse-note.service';
import { ExcuseNoteController } from './excuse-note/excuse-note.controller';
import { AbsenceRepository } from './absence/absence.repository';
import { AbsenceService } from './absence/absence.service';
import { AbsenceController } from './absence/absence.controller';
import { ExamsRepository } from './exams/exams.repository';
import { ExamsService } from './exams/exams.service';
import { ExamsController } from './exams/exams.controller';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<LessonsRepository>(TYPES.LessonsRepository).to(LessonsRepository).inSingletonScope();
	bind<LessonsService>(TYPES.LessonsService).to(LessonsService).inSingletonScope();
	bind<LessonsController>(TYPES.LessonsController).to(LessonsController).inSingletonScope();
	bind<StudentsRepository>(TYPES.StudentsRepository).to(StudentsRepository).inSingletonScope();
	bind<StudentsService>(TYPES.StudentsService).to(StudentsService).inSingletonScope();
	bind<StudentsController>(TYPES.StudentsController).to(StudentsController).inSingletonScope();
	bind<ExcuseNoteRepository>(TYPES.ExcuseNoteRepository)
		.to(ExcuseNoteRepository)
		.inSingletonScope();
	bind<ExcuseNoteService>(TYPES.ExcuseNoteService).to(ExcuseNoteService).inSingletonScope();
	bind<ExcuseNoteController>(TYPES.ExcuseNoteController)
		.to(ExcuseNoteController)
		.inSingletonScope();
	bind<AbsenceRepository>(TYPES.AbsenceRepository).to(AbsenceRepository).inSingletonScope();
	bind<AbsenceService>(TYPES.AbsenceService).to(AbsenceService).inSingletonScope();
	bind<AbsenceController>(TYPES.AbsenceController).to(AbsenceController).inSingletonScope();
	bind<ExamsRepository>(TYPES.ExamsRepository).to(ExamsRepository).inSingletonScope();
	bind<ExamsService>(TYPES.ExamsService).to(ExamsService).inSingletonScope();
	bind<ExamsController>(TYPES.ExamsController).to(ExamsController).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
