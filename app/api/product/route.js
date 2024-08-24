"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../config/database";
import Product from "../../../models/productModel";

// Get data Product
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get("page") || "1", 10);
    let limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || ""; // Get search parameter

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    try {
        await connectDB();

        //text search
        const query = search ? { productName: { $regex: search, $options: "i" } } : {};

        const products = await Product.find(query).skip(skip).limit(limit).sort({ _id: -1 });
        const totalItems = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            products,
            totalItems,
            totalPages
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

// Post product
export async function POST(request) {
    const { productName, qty, price } = await request.json();
    await connectDB();
    await Product.create({
        productName,
        qty,
        price
    });
    return NextResponse.json({ msg: "Data save success" }, { status: 200 });
}

// Delete product
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Delete Successfull" }, { status: 200 });
}
