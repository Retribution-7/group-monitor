import { Request, Response, NextFunction } from 'express';

export interface ILessonsController {
	create(req: Request, res: Response, next: NextFunction): Promise<void>;
	getByDate(req: Request, res: Response, next: NextFunction): Promise<void>;
	delete(req: Request, res: Response, next: NextFunction): Promise<void>;
	update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
