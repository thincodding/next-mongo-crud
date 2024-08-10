"use server"

import { NextResponse } from "next/server";
import connectDB from "../../../config/database";
import PostModel from "../../../models/postModel";

export async function GET(){
    await connectDB();
    const posts = await PostModel.find();
    return NextResponse.json({posts})
}