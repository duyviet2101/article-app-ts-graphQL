import express, { Express} from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer} from "apollo-server-express";
import { resolvers } from "./resolvers/index.resolver";
import { typeDefs } from "./typeDefs/index.typeDefs";
import { requireAuth } from "./middlewares/auth.middlewares";

const startServer = async () => {
  dotenv.config();
  database.connect();

  const app: Express = express();
  const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use("/graphql", requireAuth)

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => {
      return {
        ...req
      }
    },
    introspection: true, //! enables introspection of the schema
  });

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