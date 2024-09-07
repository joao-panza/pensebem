import { Request, Response, NextFunction } from 'express';
import { HandleErrorMessage } from '../enums';

export class ErrorHandler {
    public static handleErrors(err: any, _: Request, res: Response, next: NextFunction): void {
        const statusCode = err.statusCode || 500;
        const message = err.message || HandleErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE;
        const details = err.details || null;

        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message,
            details,
        });
    }
}
