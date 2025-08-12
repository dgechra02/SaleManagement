import prismaClient from "@/libs/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export async function addProducts(
  _: any,
  args: {
    title: string;
    description: string;
    category: ProductCategory;
    price: number; //?
    stock: number;
    imageUrl: string;
  }
) {
  try {
    const createProduct = await prismaClient.product.create({
      data: args,
    });
    return createProduct;
  } catch {
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();

    if (products) return products;
  } catch {
    return null;
  }
}

export async function getProduct(
  _: any,
  args: {
    id: string;
  }
) {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: args?.id,
      },
    });
    if (product) return product;
    else return null;
  } catch {
    return null;
  }
}

export async function createSale(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {


  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args?.id,
        quantity: args?.quantity,
      },
    });
    return true
  } catch {
    return false
  }
}
