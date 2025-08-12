"use client";
import { GET_PRODUCT } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product } from "../../../../generated/prisma";
import { Button } from "@radix-ui/themes";
import AddSaleButton from "@/components/buttons/add-sale-button";

export default function page() {
  const params = useParams();
  const { id } = params;

  console.log("id in product Details page : ", id)
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    async function getProduct() {

      try {
        const data: { getProduct: Product } = await gqlClient.request(
          GET_PRODUCT,
          {
            getProductId : id,
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

  console.log("product in product details page : ", product)
  return (
    <div className="flex flex-col gap-5 p-8">
      <span>{product?.title}</span>
      <span>{product?.description}</span>
      <Button >
        <AddSaleButton product={product}/>
      </Button>
    </div>
  );
}
