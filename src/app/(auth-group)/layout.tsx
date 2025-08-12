import Header from "@/components/Header";
import UserProvider from "@/contexts/user-context";
import { getUserFromCookies } from "@/libs/helper";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function layout({ children} : {children : ReactNode}){

  const user = await getUserFromCookies();
  if(!user) redirect("/login")
    return (
        <UserProvider user={user}>
          <Header />
          {children}
        </UserProvider>
    )
}