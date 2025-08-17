import { Product, RoleType, Sale } from "../../generated/prisma";

export type ProductWithSale = Product & { sales: Sale[] } | undefined;
export type ChartDataType = { date: string; quantity: number }[] | undefined;
export type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string | null;
  role: RoleType
};
