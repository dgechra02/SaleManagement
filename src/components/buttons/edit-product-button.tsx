'use client'
import { UPDATE_PRODUCT } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { ProductWithSale } from "@/types";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function EditProductButton({product} : {product : ProductWithSale}) {
    console.log("product in edit button : ", product);
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [stock, setStock] = useState<number>(product?.stock || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [category, setCategory] = useState<string>(product?.category || "");

  async function handleEditProduct() {
    console.log("handleEditProduct run");

    try {
      const data: { updateProduct: boolean } = await gqlClient.request(
        UPDATE_PRODUCT,
        {
          updateProductId : product?.id,
          title,
          description,
          category,
          price,
          stock,
          imageUrl,
        }
      );
      if (data?.updateProduct) {
        alert("product updated successfully");
      }
    } catch {
      alert("error in updating product");
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Edit Product</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Edit product
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
                Description
              </Text>
              <TextField.Root
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Price
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
                Stock
              </Text>
              <TextField.Root
                placeholder="Enter your stock"
                value={stock}
                onChange={(e) => {
                  if (e.target.value == "") {
                    setStock(0);
                  } else {
                    setStock(parseInt(e.target.value));
                  }
                }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                ImageUrl
              </Text>
              <TextField.Root
                placeholder="Enter your imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Product Type
              </Text>
              <Select.Root value={category} onValueChange={setCategory} >
                <Select.Trigger />
                <Select.Content >
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
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleEditProduct}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
