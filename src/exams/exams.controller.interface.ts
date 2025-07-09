import { Request, Response, NextFunction } from 'express';

export interface IExamsController {
	create(req: Request, res: Response, next: NextFunction): Promise<void>;
	find(req: Request, res: Response, next: NextFunction): Promise<void>;
	getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
	delete(req: Request, res: Response, next: NextFunction): Promise<void>;
	update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
