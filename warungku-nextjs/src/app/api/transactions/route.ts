import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/transactions - Ambil riwayat transaksi
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const transactions = await prisma.transaction.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });

    const total = await prisma.transaction.count();

    return NextResponse.json({ transactions, total });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data transaksi" },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Buat transaksi baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, paymentType } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Keranjang kosong" },
        { status: 400 }
      );
    }

    // Validasi stok dan hitung total
    let total = 0;
    const productUpdates: Array<{ id: string; qty: number }> = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Produk ${item.productId} tidak ditemukan` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stok ${product.name} tidak cukup (sisa: ${product.stock})` },
          { status: 400 }
        );
      }

      total += Number(product.price) * item.quantity;
      productUpdates.push({ id: product.id, qty: item.quantity });
    }

    // Buat transaksi dan update stok dalam transaction
    const transaction = await prisma.$transaction(async (tx) => {
      // Buat transaksi
      const newTransaction = await tx.transaction.create({
        data: {
          total,
          paymentType: paymentType || "CASH",
          items: {
            create: items.map((item: { productId: string; quantity: number; price: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // Update stok produk
      for (const update of productUpdates) {
        await tx.product.update({
          where: { id: update.id },
          data: { stock: { decrement: update.qty } },
        });
      }

      return newTransaction;
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Gagal membuat transaksi" },
      { status: 500 }
    );
  }
}
