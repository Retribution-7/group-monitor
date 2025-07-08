import { Transform } from 'class-transformer';
import { ValidationOptions, Validate } from 'class-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';

export function parseDate(dateString: string): Date {
	const [day, month, year] = dateString.split('.');
	const date = new Date(`20${year}-${month}-${day}T00:00:00`);

	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateString}. Expected DD.MM.YY`);
	}

	return date;
}

export function IsValidPhoneNumber(validationOptions?: ValidationOptions): PropertyDecorator {
	return Validate((value: string) => isValidPhoneNumber(value, 'BY'), {
		message: 'Invalid phone number',
		...validationOptions,
	});
}

export function CustomDate() {
	return Transform(({ value }) => {
		if (typeof value === 'string') {
			if (value.match(/^\d{2}\.\d{2}\.\d{2}$/)) {
				const [day, month, year] = value.split('.');
				return new Date(`20${year}-${month}-${day}T00:00:00`);
			}
			return new Date(value);
		}
		return value;
	});
}
