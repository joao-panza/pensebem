import { Express } from "express";

import Factory from "./bin/Factory";
import { routes } from "./decorators/Route";
import BookResolver from "./resolvers/BookResolver"

export const registerRoutes = (app: Express) => {
    // Rota de Healthcheck
    app.get("/", (_, res) => {
        res.status(200).send("Bem vindo a API Pense Bem")
    });

    // Registrar rotas definidas com o decorador
    const resolver = Factory.build(BookResolver);
    routes.forEach(route => {
        app[route.requestMethod](route.path, (req, res, next) => {
            (resolver as any)[route.methodName](req, res, next);
        });
    });
}