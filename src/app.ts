import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { registerRoutes } from './routes';
import { ErrorHandler, filterPublicFiles } from "./middlewares";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/data', filterPublicFiles);
app.use('/data', express.static(path.join(__dirname, 'data')));

registerRoutes(app);

app.use(ErrorHandler.handleErrors);

app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});

export = app;