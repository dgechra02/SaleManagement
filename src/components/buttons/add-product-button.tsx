// 'use client'
import { ADD_PRODUCT, CREATE_USER } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { Product, ProductCategory, User } from "../../../generated/prisma";

export default function AddProductButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("others");

  async function handleAddProduct() {
    console.log("handleAddProduct run");
    try {
      const product: { addProducts: Product } = await gqlClient.request(
        ADD_PRODUCT,
        {
          title,
          description,
          category,
          price,
          stock,
          imageUrl,
        }
      );
      if (product?.addProducts) {
        alert("prodcut created successfully");
      }
    } catch {
      alert("error in creating product");
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add new product
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Title
              </Text>
              <TextField.Root
                placeholder="Enter your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                description
              </Text>
              <TextField.Root
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                price
              </Text>
              <TextField.Root
                placeholder="Enter your price"
                value={price}
                onChange={(e) => {
                  if (e.target.value == "") {
                    setPrice(0);
                  } else {
                    setPrice(parseFloat(e.target.value));
                  }
                }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                stock
              </Text>
              <TextField.Root
                placeholder="Enter your stock"
                value={stock}
                onChange={(e) => {
                  if (e.target.value == "") {
                    setStock(1);
                  } else {
                    setStock(parseInt(e.target.value));
                  }
                }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                imageUrl
              </Text>
              <TextField.Root
                placeholder="Enter your imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <Select.Root value={category} onValueChange={setCategory}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Category:</Select.Label>
                  <Select.Item value="electronics">Electronics</Select.Item>
                  <Select.Item value="beauty">Beauty</Select.Item>
                  <Select.Item value="food">Food</Select.Item>
                  <Select.Item value="accessories">Accessories</Select.Item>
                  <Select.Item value="clothing">Clothing</Select.Item>
                  <Select.Item value="decor">Decor</Select.Item>
                  <Select.Item value="other">Other</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleAddProduct}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
