import { getUserFromCookies } from "@/libs/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { addProducts, createSale, getAllProducts, getProduct, updateProduct } from "./resolvers/products";
import { getSales } from "./resolvers/sale";
import { createUser, getAllUsers, loginUser, logoutUser, updateUserProfile, updateUserRole } from "./resolvers/user";
import { typeDefs } from './typeDefs';
import { NextRequest } from "next/server";


const resolvers = {
  Query: {
    loginUser,
    logoutUser,
    currentUser : getUserFromCookies,
    getAllUsers, 
    getAllProducts, 
    getProduct, 
    getSales
  },
  Mutation: {
    createUser,
    updateUserRole, 
    updateUserProfile, 
    addProducts, 
    createSale, 
    updateProduct
  }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// const handler = startServerAndCreateNextHandler(server, {
//     context: async req => ({ req }),
// });

// export { handler as GET, handler as POST };

const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}