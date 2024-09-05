import { Express } from "express";

import Factory from "./bin/Factory";
import BookResolver from "./resolvers/BookResolver"

export const registerRoutes = (app: Express) => {
    // Rota de Healthcheck
    app.get("/", (_, res) => {
        res.status(200).send("Bem vindo a API Pense Bem")
    });

    app.get("/books", (req, res) => Factory.build(BookResolver).getBooks(req, res));

    app.get("/books/:id", (req, res) => Factory.build(BookResolver).getBookById(req, res));
}