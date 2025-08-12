"use client";
import { GET_ALL_PRODUCTS } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../generated/prisma";
import AddProductButton from "./buttons/add-product-button";
import { UserContext } from "@/contexts/user-context";

export default function ProductList() {
  const data = useContext(UserContext);
  const user = data?.user;

  const [products, setProducts] = useState<[Product] | []>();
  useEffect(() => {
    async function getProducts() {
      const data: { getAllProducts: [Product] } = await gqlClient.request(
        GET_ALL_PRODUCTS
      );
      setProducts(data?.getAllProducts);
      console.log("data > getAllProducts : ", data);
    }
    getProducts();
  }, []);

  return (
    <div className="prodcuts border p-2 flex-1">
      <div className="flex justify-between p-2">
        <span className="font-semibold text-xl">Prodcuts</span>
        {user?.role != "staff" ? <AddProductButton /> : null}
      </div>
      <div className="all products grid grid-cols-4 gap-2">
        {products?.map((product) => (
          <Box key={product?.id} maxWidth="400px">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src="https://media.tenor.com/L3bo3h3YaPgAAAAm/coolcatjam-cat.webp"
                  radius="full"
                  fallback="T"
                />
                <Box>
                  <Link href={`products/${product?.id}`}>
                    <Text as="div" size="2" weight="bold">
                      {product?.title}
                    </Text>
                  </Link>
                  <Text as="div" size="2" color="gray">
                    {product?.description}
                  </Text>
                </Box>
              </Flex>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
}
