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
