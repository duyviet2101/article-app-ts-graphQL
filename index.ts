import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

dotenv.config();
database.connect();

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

import Article from "./models/article.model";

app.get("/", async (req: Request, res: Response) => {
  const articles = await Article.find({
    deleted: false
  });
  res.json(articles);
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});