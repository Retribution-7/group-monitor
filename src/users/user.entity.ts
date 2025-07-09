// user.entity.ts
import { compare, hash } from 'bcryptjs';
import { UserProps } from './user.props.interface';

export class User {
	private _password: string;

	constructor(private readonly props: UserProps) {
		if (props.passwordHash) {
			this._password = props.passwordHash;
		}
	}

	get email(): string {
		return this.props.email;
	}

	get firstName(): string {
		return this.props.firstName ?? '';
	}

	get lastName(): string {
		return this.props.lastName ?? '';
	}

	get fathersName(): string {
		return this.props.fathersName ?? '';
	}

	get birthday(): Date {
		return this.props.birthday ?? new Date(0);
	}

	get phone(): string {
		return this.props.phone ?? '';
	}

	get groupe(): string {
		return this.props.groupe ?? '';
	}

	get course(): number {
		return this.props.course ?? NaN;
	}

	get address(): string {
		return this.props.address ?? '';
	}

	get password(): string {
		return this._password;
	}

	public setEmail(email: string): void {
		this.props.email = email;
	}

	public setFirstName(firstName: string): void {
		this.props.firstName = firstName;
	}

	public setLastName(lastName: string): void {
		this.props.lastName = lastName;
	}

	public setFathersName(fathersName: string): void {
		this.props.fathersName = fathersName;
	}

	public setBirthday(birthday: Date): void {
		this.props.birthday = birthday;
	}

	public setPhone(phone: string): void {
		this.props.phone = phone;
	}

	public setGroupe(groupe: string): void {
		this.props.groupe = groupe;
	}

	public setCourse(course: number): void {
		this.props.course = course;
	}

	public setAddress(address: string): void {
		this.props.address = address;
	}

	public async setPassword(password: string, salt: number): Promise<void> {
		this._password = await hash(password, salt);
	}

	public async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this._password);
	}
}
