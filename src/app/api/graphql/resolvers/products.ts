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
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
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
    if (sale) {
      await prismaClient.product.update({
        where: {
          id: args?.id,
        },
        data: {
          stock: {
            decrement: args?.quantity, // valid for integers
          },
        },
      });
    }
    return true;
  } catch {
    return false;
  }
}

export async function updateProduct(
  _: any,
  args: {
    id: string;
    title: string;
    description: string;
    category: ProductCategory;
    price: number;
    stock: number;
    imageUrl: string;
  }
) {
  const dataToUpdate = {
    title: args?.title,
    description: args?.description,
    category: args?.category,
    price: args?.price,
    stock: args?.stock,
    imageUrl: args?.imageUrl,
  };
  try {
    const updatedProduct = await prismaClient.product.update({
      where: {
        id: args.id,
      },
      data: dataToUpdate,
    });
    return true;
  } catch (error : any) {
    console.log("error in update product ; ", error?.message)
    return false;
  }
}
