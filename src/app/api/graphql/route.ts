import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler =
  startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}