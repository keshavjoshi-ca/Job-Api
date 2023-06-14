import { NextFunction, Request, Response } from "express"

export const Logger = (req: Request, res: Response, next: NextFunction) => {
    console.info(`[JobApiManager] ${req.method} ${req.url}`)
    next();
}