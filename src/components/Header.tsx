"use client";
import { UserContext } from "@/contexts/user-context";
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import gqlClient from "@/libs/services/graphql";
import { LOGOUT_USER } from "@/libs/gql/queries";
import { ThemeContext } from "@/contexts/theme-context";

export default function Header() {
  const { user } = useContext(UserContext);
  const { setIsDark, isDark } = useContext(ThemeContext); 

  console.log("isDark : ", isDark);

  async function handleLogout() {
    try {
      const data = await gqlClient.request(LOGOUT_USER);
      //   alert("logged out");
      window.location.href = "http://localhost:3000";
    } catch {
      alert("failed");
    }
  }

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b mb-3">
      <div className="logo flex gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/12474/12474074.png"
          alt="logo"
          className="w-10"
        />
        <h1 className="font-bold text-2xl">SaleStream </h1>
      </div>

      <div className="profile flex gap-2">
        <label className="swap swap-rotate" >
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            onClick={() => setIsDark(!isDark)}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
