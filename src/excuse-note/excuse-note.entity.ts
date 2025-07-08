export class ExcuseNote {
	constructor(
		public studentId: number,
		public noteNumber: string,
		public issueDate: Date,
		public illnessStart: Date,
		public illnessEnd: Date,
		public physicalEducationStart: Date,
		public physicalEducationEnd: Date,
	) {}
}
