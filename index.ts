import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3011;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});