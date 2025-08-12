"use client";
import { GET_PRODUCT } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product, Sale } from "../../../../generated/prisma";
import { Button } from "@radix-ui/themes";
import AddSaleButton from "@/components/buttons/add-sale-button";
import ProductSaleChart from "@/components/productSaleChart";
import { ProductWithSale } from "@/types";



export default function page() {
  const params = useParams();
  const { id } = params;

  console.log("id in product Details page : ", id);
  const [product, setProduct] = useState<ProductWithSale>();
  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getProduct: ProductWithSale } = await gqlClient.request(
          GET_PRODUCT,
          {
            getProductId: id,
          }
        );
        console.log("data  in product details page : ", data);
        if (data?.getProduct) {
          setProduct(data?.getProduct);
        } else {
          console.log("product not available");
        }
      } catch {
        console.log("prodcut not found in user side");
      }
    }
    getProduct();
  }, []);

  const chartData = product?.sales?.map( (sale) => {
    const date = new Date(Number(sale.createdAt));
    const format = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();
    const quantity = sale.quantity;

    const obj = {
        date : format, 
        quantity
    }

    return obj;
  })

  console.log("product in product details page : ", product);
  return (
    <div className="flex flex-col gap-5 p-8">
      <span>title : {product?.title}</span>
      <span>description : {product?.description}</span>
      <span>stock : {product?.stock}</span>
      <span>{product?.id}</span>
      <span>{product?.price}</span>
      <span>{product?.category}</span>
      <Button>
        <AddSaleButton product={product} />
      </Button>
      <div className="w-64 h-64">
        <ProductSaleChart chartData={chartData}/>
      </div>
    </div>
  );
}
