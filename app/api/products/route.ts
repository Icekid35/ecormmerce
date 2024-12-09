import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Product } from "@/app/types/product";


// File path for the product data
const dataFilePath = path.join(process.cwd(), "data", "products.json");

// Helper functions to read and write data
const readData = (): Product[] => {
  try{
    fs.existsSync(dataFilePath)
  }catch (err) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
};

const writeData = (data: Product[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Handle GET request
export async function GET() {
  const products = readData();
  return NextResponse.json(products);
}

// Handle POST request
export async function POST(req: Request) {
  const products = readData();
  const body = await req.json();

  const newProduct: Product = { id: Date.now().toString(), ...body };
  products.push(newProduct);
  writeData(products);

  return NextResponse.json({ message: "Product added", product: newProduct }, { status: 201 });
}

// Handle DELETE request
export async function DELETE(req: Request) {
  const products = readData();
  const body = await req.json();

  const updatedProducts = products.filter((product) => product.id !== body.id);
  writeData(updatedProducts);

  return NextResponse.json({ message: "Product deleted" });
}
