"use client";
import AdminDashboard from "@/components/admin-dashboard";
import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);
  console.log("user in auth maain page : ", user)
  return (
    <div>
      <main>{user?.role && <AdminDashboard />}</main>
    </div>
  );
}