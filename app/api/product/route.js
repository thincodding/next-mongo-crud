"use server"

import { NextResponse } from "next/server";
import connectDB from "../../../config/database";
import Product from "../../../models/productModel";


//get data Product
export async function GET(){
    await connectDB();
    const product = await Product.find().sort({_id: -1});
    return NextResponse.json({product})
}

//Post product
export async function POST(request){
    const {productName, qty, price} = await request.json();
    await connectDB();
    await Product.create({
        productName,qty,price
    })
    return NextResponse.json({msg: "Data save success"}, {status: 201})
}

//get Product by ID

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id")
    await connectDB();
    await Product.findByIdAndDelete(id)
    return NextResponse.json({msg: "Delete Successfull"}, {status: 200})
}



