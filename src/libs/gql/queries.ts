import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      username
      email
      name
      role
      id
    }
  }
`;

export const GET_ALL_USER = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      username
      email
      avatar
      role
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProducts(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      id
      category
      description
      imageUrl
      price
      stock
      title
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      category
      price
      stock
      imageUrl
    }
  }
`;

export const GET_PRODUCT = gql`
  query Query($getProductId: String) {
    getProduct(id: $getProductId) {
      id
      title
      description
      category
      price
      stock
      imageUrl
      sales {
        id
        productId
        quantity
        createdAt
      }
    }
  }
`;

export const CREATE_SALE = gql`
  mutation CreateSale($createSaleId: String!, $quantity: Int!) {
    createSale(id: $createSaleId, quantity: $quantity)
  }
`;

export const LOGOUT_USER = gql`
  query Sales {
    logoutUser
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation Mutation(
    $userId: String!
    $name: String!
    $email: String!
    $username: String!
    $avatar: String
    $role: String!
  ) {
    updateUserProfile(
      userId: $userId
      name: $name
      email: $email
      username: $username
      avatar: $avatar
      role: $role
    )
  }
`;

export const GET_ALL_SALES = gql`
  query GetSales {
    getSales {
      id
      quantity
      productId
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Mutation(
    $updateProductId: String!
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    updateProduct(
      id: $updateProductId
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    )
  }
`;
