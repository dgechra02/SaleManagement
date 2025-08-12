"use client";
import React, { useEffect, useState } from "react";
import AddUserButton from "./buttons/add-user-button";
import gqlClient from "@/libs/services/graphql";
import {
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ALL_USER,
} from "@/libs/gql/queries";
import { Product, User } from "../../generated/prisma";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import AddProductButton from "./buttons/add-product-button";
import Link from "next/link";

export default function AdminDashboard() {
  const [users, setUsers] = useState<[User] | []>();
  const [products, setProducts] = useState<[Product] | []>();
  useEffect(() => {
    async function getUsers() {
      const data: { getAllUsers: [User] } = await gqlClient.request(
        GET_ALL_USER
      );
      setUsers(data?.getAllUsers);
      console.log("data > getAllUsers : ", data);
    }
    getUsers();
  }, []);

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

  console.log("prodcuts array : ", products);

  //   setUsers(data?.getAllUsers)

  return (
    <div className="flex justify-center">
      <div></div>
      <div className='w-[95%]'>
        <div className="grid grid-cols-[3fr_1fr] gap-5">

          <div className="prodcuts border">
            <span>Prodcuts</span>
            <AddProductButton />
            <div className="all products">
              {products?.map((product) => (
                <Box key={product?.id} maxWidth="240px" >
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

          <div className="border">
            <span>all users</span>
            <AddUserButton />

            <div className="all users">
              {users?.map((u) => (
                <Box key={u?.id} maxWidth="240px">
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src="https://media.tenor.com/L3bo3h3YaPgAAAAm/coolcatjam-cat.webp"
                        radius="full"
                        fallback="T"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Teodros Girmay
                        </Text>
                        <Text as="div" size="2" color="gray">
                          Engineering
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
