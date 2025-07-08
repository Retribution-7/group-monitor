export enum AbsenceStatusType {
	VALID = 'valid',
	UNVALID = 'unvalid',
}
export class Absence {
	constructor(
		public studentId: number,
		public missedClasses: number,
		public absenceDate: Date,
		public status: AbsenceStatusType,
		public comment: string,
	) {}
}
