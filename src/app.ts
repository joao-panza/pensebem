import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { registerRoutes } from './routes';
import { ErrorHandler } from "./middlewares";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

registerRoutes(app);

app.use(ErrorHandler.handleErrors);

app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});

export = app;