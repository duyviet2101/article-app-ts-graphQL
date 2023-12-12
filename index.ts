import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";
import { Query } from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  dotenv.config();
  database.connect();

  const app: Express = express();
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  //! code graphQL
  // import Article from "./models/article.model";

  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql"
  });

  app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
  });
}

startServer();