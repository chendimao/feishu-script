import { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  errorType?: string
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${err.message}`, {
    url: req.url,
    method: req.method,
    stack: err.stack
  })

  const statusCode = err.statusCode || 500
  const errorType = err.errorType || 'INTERNAL_ERROR'

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    errorType,
    timestamp: new Date().toISOString()
  })
}
