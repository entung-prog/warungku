import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/dashboard - Data ringkasan dashboard
export async function GET() {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Transaksi hari ini
    const todayTransactions = await prisma.transaction.findMany({
      where: {
        createdAt: { gte: startOfDay },
        status: "COMPLETED",
      },
    });

    const todaySales = todayTransactions.reduce(
      (sum, t) => sum + Number(t.total),
      0
    );
    const todayCount = todayTransactions.length;

    // Transaksi bulan ini
    const monthTransactions = await prisma.transaction.findMany({
      where: {
        createdAt: { gte: startOfMonth },
        status: "COMPLETED",
      },
    });

    const monthSales = monthTransactions.reduce(
      (sum, t) => sum + Number(t.total),
      0
    );

    // Stok menipis
    const lowStockProducts = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: { lte: prisma.product.fields.minStock },
      },
    });

    // Fallback: ambil produk dengan stok <= minStock manual
    const allProducts = await prisma.product.findMany({
      where: { isActive: true },
    });
    const lowStockCount = allProducts.filter(
      (p) => p.stock <= p.minStock
    ).length;

    // Transaksi kemarin (untuk perbandingan)
    const yesterday = new Date(startOfDay);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayTransactions = await prisma.transaction.findMany({
      where: {
        createdAt: { gte: yesterday, lt: startOfDay },
        status: "COMPLETED",
      },
    });
    const yesterdaySales = yesterdayTransactions.reduce(
      (sum, t) => sum + Number(t.total),
      0
    );

    const salesGrowth =
      yesterdaySales > 0
        ? ((todaySales - yesterdaySales) / yesterdaySales) * 100
        : 0;

    return NextResponse.json({
      todaySales,
      todayCount,
      monthSales,
      monthTarget: 40000000, // Target 40jt per bulan
      lowStockCount,
      salesGrowth: Math.round(salesGrowth * 10) / 10,
      lowStockProducts: lowStockProducts.length > 0 ? lowStockProducts : allProducts.filter(p => p.stock <= p.minStock),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dashboard" },
      { status: 500 }
    );
  }
}
