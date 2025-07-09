export enum ExamType {
	EXAM = 'exam',
	ASSESSMENT = 'assessment',
	GRADED_ASSESSMENT = 'graded assessment',
}
export class Exam {
	constructor(
		public subject: string,
		public date: Date,
		public start: string,
		public auditorium: string,
		public teacher: string,
		public examType: ExamType,
	) {}
}
