'use client'
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";
import ProductList from "./products-list";
import SideBar from "./side-bar";

export default function AdminDashboard() {
  const data = useContext(UserContext)
  const user = data?.user;
  return (
    <div className="flex justify-center">
      <div className="w-[95%]">
        <div className="flex gap-5">
          <ProductList />
          {user?.role == "admin" ? <SideBar /> : null}
        </div>
      </div>
    </div>
  );
}
