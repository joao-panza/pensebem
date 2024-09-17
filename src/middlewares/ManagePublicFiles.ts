// Middleware para filtrar acessos
import path from "path";
import { Request, Response, NextFunction } from "express";

export const filterPublicFiles = (req: Request, res: Response, next: NextFunction) => {
    const filePath = path.join(__dirname, '../data', req.path);
    const fileExt = path.extname(filePath);

    const extensionsAllowed = ['.pdf', '.jpg'];

    // Verificar se o arquivo solicitado é um PDF
    if (!extensionsAllowed.includes(fileExt)) {
        return res.status(404).send();
    }

    next();
};