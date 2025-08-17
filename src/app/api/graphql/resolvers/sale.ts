import prismaClient from "@/libs/services/prisma";

export async function getSales() {
    try {
        const sales = await prismaClient.sale.findMany();
        return sales;
    } catch {
        return null;
    }
}