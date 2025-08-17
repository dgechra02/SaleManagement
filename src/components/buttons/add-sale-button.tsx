// 'use client'
import { CREATE_SALE } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { ProductWithSale } from "@/types";
import {
    Button,
    Dialog,
    Flex,
    Text,
    TextField
} from "@radix-ui/themes";
import { useState } from "react";
import { Sale } from "../../../generated/prisma";

export default function AddSaleButton({ product }: { product: ProductWithSale }) {
  const [quantity, setQuantity] = useState<number>(1);

  async function handleAddSale() {
    if (product && product.stock < quantity) {
      alert("can't add a sale more then quantity");
      return;
    }
    try {
        const data : { createSale : Sale } = await gqlClient.request(CREATE_SALE, {
            createSaleId : product?.id, quantity : quantity
        })

        if(data?.createSale){
            alert("Sale added");
        }
    } catch {
      alert("error");
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add Sale</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Sale</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add Quantity
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                quantity
              </Text>
              <TextField.Root
                placeholder="Enter your quantity"
                value={quantity}
                onChange={(e) => {
                    let value = e.target.value; 
                    if(value == "") {
                         setQuantity(0)
                    } else {
                        setQuantity(parseInt(e.target.value))
                    }
                }}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleAddSale}>Add Sale</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}