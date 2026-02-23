import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../exception';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.status).json({
      message: err.message,
      status: err.status,
      info: err.info,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  return res.status(404).json({
      method: req.method,
      url: req.originalUrl,
      message: 'Route not found'
  });
}
