// Middleware para filtrar acessos
import path from "path";
import { Request, Response, NextFunction } from "express";

export const filterPublicFiles = (req: Request, res: Response, next: NextFunction) => {
    const filePath = path.join(__dirname, '../data', req.path);

    // Verificar se o arquivo solicitado é um PDF
    if (path.extname(filePath) !== '.pdf') {
        return res.status(404).send();
    }

    next();
};