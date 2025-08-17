"use client";
import { UserContext } from "@/contexts/user-context";
import { useContext, useEffect, useState } from "react";
import ProductList from "./products-list";
import SideBar from "./side-bar";
import AllProductsSaleChart from "./all-product-sale-chart";
import gqlClient from "@/libs/services/graphql";
import { GET_ALL_SALES } from "@/libs/gql/queries";
import { Sale } from "../../generated/prisma";

export default function AdminDashboard() {
  const data = useContext(UserContext);
  const user = data?.user;
  const [sales, setSales] = useState<[Sale]>();

  useEffect(() => {
    async function getAllSales() {
      try {
        const data: { getSales: [Sale] } = await gqlClient.request(
          GET_ALL_SALES
        );
        if (data?.getSales) {
          setSales(data?.getSales);
        } else {
          console.log("sales are not available");
        }
      } catch {
        console.log("Error finding sales");
      }
    }
    getAllSales();
  }, []);

  const chartData =
    sales?.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format =
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      const quantity = sale.quantity;

      const obj = {
        date: format,
        quantity,
      };

      return obj;
    });

  return (
    <div className="flex justify-center">
      <div className="w-[95%] flex flex-col gap-5">
        <div className="flex max-md:flex-col gap-5">
          <ProductList />
          {user?.role == "admin" ? <SideBar /> : null}
        </div>
        <div className="saleChart w-full md:w-[80%] h-[500px] m-auto p-4 md:p-10 flex flex-col gap-6 ">
          <span className="text-xl font-semibold">
            All products sales chart
          </span>
          <div className="rounded-lg border-2 p-2 md:p-6 w-full h-full">
            <AllProductsSaleChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}