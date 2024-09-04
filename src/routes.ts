import { Express } from "express";

import BookResolver from "./resolvers/BookResolver"

export const registerRoutes = (app: Express) => {
    // Rota de Healthcheck
    app.get("/", (_, res) => {
        res.status(200).send("Bem vindo a API Pense Bem")
    });

    app.get("/books", BookResolver.getBooks);

    app.get("/books/:id", BookResolver.getBookById);
}