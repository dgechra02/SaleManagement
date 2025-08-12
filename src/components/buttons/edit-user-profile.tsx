import { CREATE_USER, UPDATE_USER_PROFILE } from "@/libs/gql/queries";
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
import { RoleType, User } from "../../../generated/prisma";
import { Pencil } from "lucide-react";

export default function EditUserProfile({user} : {user : User}) {
  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [role, setRole] = useState<RoleType>(user?.role || "staff");
  const [avatar, setAvatar] = useState(user?.avatar || "");


  async function handleAddUser(){
    console.log("handleAddUser run");
    try {
        const data : {updateUserProfile : User } = await gqlClient.request(UPDATE_USER_PROFILE, {
            userId : user?.id, name, email, username, role, avatar
        })
        console.log("data in create suer", data)
        if(data?.updateUserProfile){
            alert("user profile updated")
        }
    } catch{
        alert("error")
    }
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button><Pencil /></Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit User</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Edit user profile
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Root
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <TextField.Root
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Avatar
              </Text>
              <TextField.Root
                placeholder="Enter your Avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </label>
           
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Role:</Select.Label>
                  <Select.Item value="manager">Manager</Select.Item>
                  <Select.Item value="staff">Staff</Select.Item>
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
              <Button onClick={handleAddUser}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
