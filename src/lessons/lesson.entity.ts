export enum LessonType {
	LECTURE = 'lecture',
	PRACTICE = 'practice',
	LAB = 'lab',
}

export enum weekDayType {
	Sunday = 'Sunday',
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wednesday = 'Wednesday',
	Thursday = 'Thursday',
	Friday = 'Friday',
	Saturday = 'Saturday',
}

export enum weekType {
	Upper = 'upper',
	Lower = 'lower',
	Both = 'both',
}

export class Lesson {
	constructor(
		public weekDay: weekDayType,
		public weekType: weekType,
		public start: string,
		public end: string,
		public subject: string,
		public teacher: string,
		public auditorium: string,
		public lessonsType: LessonType,
		public subgroup?: number,
	) {}
}
