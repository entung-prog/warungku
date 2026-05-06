import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/products - Ambil semua produk
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// POST /api/products - Tambah produk baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, sku, price, stock, category, image, minStock } = body;

    if (!name || !sku || price === undefined || stock === undefined || !category) {
      return NextResponse.json(
        { error: "Data produk tidak lengkap" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        stock,
        category,
        image: image || null,
        minStock: minStock || 5,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Gagal menambah produk" },
      { status: 500 }
    );
  }
}
