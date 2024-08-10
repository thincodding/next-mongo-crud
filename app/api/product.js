'use server'

import PostModel from '../../models/postModel'
import connectDB from "../../config/database"
import { NextResponse } from "next/server";


export async function getPosts(){
    try{

        await connectDB();
        const data = await PostModel.find();
        // const data = JSON.parse(JSON.stringify(await PostModel.find()))
        return new NextResponse(data)

    }
    catch(err){
        console.log(err)
    }
}