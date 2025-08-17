"use client";
import AddSaleButton from "@/components/buttons/add-sale-button";
import EditProductButton from "@/components/buttons/edit-product-button";
import ProductSaleChart from "@/components/productSaleChart";
import { UserContext } from "@/contexts/user-context";
import { GET_PRODUCT } from "@/libs/gql/queries";
import gqlClient from "@/libs/services/graphql";
import { ProductWithSale } from "@/types";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const { user } = useContext(UserContext);
  console.log("user user user ", user);
  console.log("user role ", user?.role);

  console.log("id in product Details page : ", id);
  const [product, setProduct] = useState<ProductWithSale>();
  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getProduct: ProductWithSale } = await gqlClient.request(
          GET_PRODUCT,
          {
            getProductId: id,
          }
        );
        console.log("data  in product details page : ", data);
        if (data?.getProduct) {
          setProduct(data?.getProduct);
        } else {
          console.log("product not available");
        }
      } catch {
        console.log("prodcut not found in user side");
      }
    }
    getProduct();
  }, []);

  const chartData = product?.sales?.map((sale) => {
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

  console.log("product in product details page : ", product);
  return (
    <div className="flex max-md:flex-col gap-8 p-8">
      <div className="details flex flex-col gap-6 max-md:w-full md:flex-1">
        <h2 className="text-xl font-semibold">Product Details</h2>

        <div className="rounded-lg border-2 p-6 space-y-4">
          <img
            src={product?.imageUrl}
            alt="product-image"
            className="w-[50%] rounded mb-3"
          />
          <hr className="" />
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">Title:</span>
              <span className="text-sm  text-right flex-1 ml-4">
                {product?.title}
              </span>
            </div>

            <hr className="" />

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">Description:</span>
              <span className="text-sm  text-right flex-1 ml-4">
                {product?.description}
              </span>
            </div>

            <hr className="" />

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">Stock:</span>
              <span className="text-sm  text-right flex-1 ml-4">
                {product?.stock}
              </span>
            </div>

            <hr className="" />

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">Price:</span>
              <span className="text-sm  text-right flex-1 ml-4">
                ₹{product?.price}
              </span>
            </div>

            <hr className="" />

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">Category:</span>
              <span className="text-sm  text-right flex-1 ml-4">
                {product?.category}
              </span>
            </div>

            <hr className="" />

            <div className="flex justify-between items-start">
              <span className="text-sm font-medium ">ID:</span>
              <span className="text-xs font-mono text-right flex-1 ml-4 break-all">
                {product?.id}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          {user?.role != "guest" ? <AddSaleButton product={product} /> : null}
          {user?.role != "guest" && user?.role != "staff" ? (
            <EditProductButton product={product} />
          ) : null}
        </div>
      </div>
      <div className=" max-md:w-full md:flex-1 h-[500px] flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Sales Chart</h2>
        <div className="chart rounded-lg border-2 p-2 md:p-6 w-full h-full">
          <ProductSaleChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
