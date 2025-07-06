export enum LessonType {
	LECTURE = 'lecture',
	PRACTICE = 'practice',
	LAB = 'lab',
}

export class Lesson {
	constructor(
		public date: Date,
		public start: string,
		public end: string,
		public subject: string,
		public teacher: string,
		public auditorium: string,
		public lessonsType: LessonType,
	) {}
}
