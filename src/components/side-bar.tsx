"use client";
import { GET_ALL_USER } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Text
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { User } from "../../generated/prisma";
import AddUserButton from "./buttons/add-user-button";
import EditUserProfile from "./buttons/edit-user-profile";
export default function SideBar() {
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    async function getUsers() {
      const data: { getAllUsers: User[] } = await gqlClient.request(
        GET_ALL_USER
      );
      setUsers(data?.getAllUsers);
      console.log("data > getAllUsers : ", data);
    }
    getUsers();
  }, []);

  return (
    <div className="border users p-2 w-80">
      <div className="flex justify-between p-2">
        <span className="text-xl font-semibold">All Users</span>
        <AddUserButton />
      </div>

      <div className="all users flex flex-col gap-1">
        {users?.map((user) => (
          <Box key={user?.id} maxWidth="280px">
            <Card>
              <Flex gap="3" align="center" justify="between">
                <Avatar
                  size="3"
                  src={user?.avatar || ""}
                  alt="user-avatar"
                  radius="full"
                  fallback={user?.name?.charAt(0)}
                />
                <Box>
                  <Text as="div" size="2" weight="bold">
                    {user?.name}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {user?.username}
                  </Text>
                </Box>
                <EditUserProfile user={user} toEdit=""/>
              </Flex>
            </Card>
          </Box>
        ))}
      </div>
    </div>
  );
}
