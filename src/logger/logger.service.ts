import { ILogObj, Logger, ISettingsParam } from 'tslog';
import { ILogger } from './logger.interface';

export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		const settings: ISettingsParam<ILogObj> = {
			type: 'pretty',
			hideLogPositionForProduction: true,
		};

		this.logger = new Logger<ILogObj>(settings);
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
