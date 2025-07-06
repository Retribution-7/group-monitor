import { LessonModel } from '../generated/prisma';
import { LessonCreateDto } from './dto/create-lesson.dto';
import { LessonUpdateDto } from './dto/update-lesson.dto';

export interface ILessonsService {
	createLesson: (dto: LessonCreateDto) => Promise<LessonModel>;
	getLessonsByDate: (date: string) => Promise<LessonModel[] | null>;
	deleteLesson: (id: number) => Promise<LessonModel>;
	updateLesson: (id: number, dto: LessonUpdateDto) => Promise<LessonModel>;
}
