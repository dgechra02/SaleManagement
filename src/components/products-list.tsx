"use client";
import { UserContext } from "@/contexts/user-context";
import { GET_ALL_PRODUCTS } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Product } from "../../generated/prisma";
import AddProductButton from "./buttons/add-product-button";

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
        <span className="font-semibold text-xl">Products</span>
        {user?.role != "staff" && user?.role != 'guest' ? <AddProductButton /> : null}
      </div>
      <div className="all products grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 items-center gap-2">
        {products?.map((product) => (
          <Box key={product?.id} maxWidth="">
            <Card>
              <Flex gap="3" align="center">
                <Avatar
                  size="3"
                  src={product?.imageUrl}
                  radius="full"
                  fallback={product?.title?.charAt(0)}
                />
                <Box>
                    <Text as="div" size="4" weight="bold" className="line-clamp-1">
                      {product?.title}
                    </Text>
                  <Text as="div" size="3" color="gray" className="line-clamp-1">
                    {product?.description}
                  </Text>
                  <Link href={`products/${product?.id}`} className="flex gap-1 text-sm text-[#b2b6bc] truncate">
                    View details <MoveRight className="w-3" />
                  </Link>
                </Box>
              </Flex>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
}
