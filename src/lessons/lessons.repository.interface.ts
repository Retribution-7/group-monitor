import { LessonModel } from '../generated/prisma';
import { LessonUpdateDto } from './dto/update-lesson.dto';
import { Lesson } from './lesson.entity';

export interface ILessonsRepository {
	create: (lesson: Lesson) => Promise<LessonModel>;
	find: (date: string) => Promise<LessonModel[] | null>;
	delete: (id: number) => Promise<LessonModel>;
	update: (id: number, dto: LessonUpdateDto) => Promise<LessonModel>;
}
