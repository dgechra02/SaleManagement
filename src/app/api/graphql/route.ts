import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import {typeDefs} from './typeDefs'
import { createUser, getAllUsers, loginUser, logoutUser, updateUserProfile, updateUserRole } from "./resolvers/user";
import { getUserFromCookies } from "@/libs/helper";
import { addProducts, createSale, getAllProducts, getProduct } from "./resolvers/products";


const resolvers = {
  Query: {
    loginUser,
    logoutUser,
    currentUser : getUserFromCookies,
    getAllUsers, 
    getAllProducts, 
    getProduct
  },
  Mutation: {
    createUser,
    updateUserRole, 
    updateUserProfile, 
    addProducts, 
    createSale
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };