import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Product from "@/models/productModel";
//update product
export async function PUT(request, {params}){
    const {id} = params;
    await connectDB();
    const {newPname: productName, newQty: qty, newPrice: price} = await request.json();
    await Product.findByIdAndUpdate(id, {productName, qty, price})
    return NextResponse.json({msg: "Product Updateed"}, {status: 200})
}

//get by id
export async function GET(request, {params}){

    const {id} = params;
    await connectDB();
    const product = await Product.findOne({_id: id})
    return NextResponse.json({product}, {status: 200})

}