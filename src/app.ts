import express from "express";
import cors from "cors";
import { registerRoutes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(4000, () => {
    registerRoutes(app);

    console.log("Servidor rodando na porta 4000");
});

export = app;