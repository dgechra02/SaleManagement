"use client";
import AdminDashboard from "@/components/admin-dashboard";
import { UserContext } from "@/contexts/user-context";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <main>{user?.role && <AdminDashboard />}</main>
    </div>
  );
}

{
  /* <div className="flex justify-between px-6 py-3 border-b">
        <h1 className="text-2xl font-bold">Blog App</h1>
        <form action="" className="flex gap-2 border">
          <input type="search" placeholder="search" />
          <button>
            <Search />
          </button>
        </form>
        <Link href="/login">login</Link>
      </div> */
}

// prisma
// npm install prisma --save-dev
// npx prisma >>>>
// npx prisma init --datasource-provider mongodb --output ../generated/prisma
// npx prisma generate > npx prisma db push
// npx create-next-app@latest ./ to install all dependencies in the same folder
// npx prisma studio // to view jobs

//   id          String @id @default(auto()) @map("_id") @db.ObjectId --  neccessary value of id
// {/* mXYh4unlqfDcQSAs */}
// mongodb+srv://dgrajendra2021:mXYh4unlqfDcQSAs@cluster0.zpn5jll.mongodb.net/mainProject?retryWrites=true&w=majority&appName=Cluster0 */}

// radix
// npm install @radix-ui/themes
// import "@radix-ui/themes/styles.css";

// graph ql
// npm install @apollo/server
// npm install @as-integrations/next
// npm install graphql-tag
// npm i graphql-request

// jwt
// npm install jsonwebtoken
// npm install -D @types/jsonwebtoken
