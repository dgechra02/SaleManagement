import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean,
    logoutUser: Boolean,
    currentUser: User, 
    getAllUsers: [User], 
    getAllProducts: [Product],
    getProduct(id: String): Product, 
    getProductSales: [Sale],
    getSales: [Sale]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String
    ): User # expecting User value but it is not mandatory, so you can return null also
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(userId: String!, name: String!, email: String!, username: String!, role: String!, avatar: String) : Boolean
    addProducts(title: String!, description: String!, category: String!, price: Float!, stock: Int!, imageUrl: String!) : Product
    createSale(id: String!, quantity: Int!) : Boolean
    updateProduct(id: String!, title: String!, description: String!, category: String!, price: Float!, stock: Int!, imageUrl: String!) : Boolean
  }
  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }

  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }
`;