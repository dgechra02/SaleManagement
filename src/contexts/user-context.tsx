"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { $Enums, User } from "../../generated/prisma";

type userWithoutPassword = {
  name: string;
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  role: $Enums.RoleType;
};

export const UserContext = createContext<{
  user?: userWithoutPassword;
}>({});

export default function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: userWithoutPassword;
}) {

    useEffect

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
