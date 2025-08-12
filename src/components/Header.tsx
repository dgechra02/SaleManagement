'use client'
import { UserContext } from "@/contexts/user-context";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
//   console.log("user user ", user)

  return (
    <header>
      <Box maxWidth="240px">
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
              radius="full"
              fallback={user?.name?.charAt(0) || "U"}
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {user?.name}
              </Text>
              <Text as="div" size="2" color="gray">
                {user?.role}
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </header>
  );
}
