import { Express } from "express";

export const registerRoutes = (app: Express) => {
    // Rota de Healthcheck
    app.get("/", (_, res) => {
        res.status(200).send("Bem vindo a API Pense Bem")
    });

    
}