"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../../config/database";
import { Image } from "../../../../models/imageModels";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync, existsSync, unlinkSync } from 'fs';

const uploadDir = join(process.cwd(), 'public/uploads');
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

export const PUT = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = params;
        const data = await request.formData();
        const file = data.get('file');
        const names = data.get("names");

        if (!file) {
            return NextResponse.json({ success: false, response: "No file provided" }, { status: 400 });
        }

        const image = await Image.findById(id);
        if (!image) {
            return NextResponse.json({ msg: "Image not found" }, { status: 404 });
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);
        const newFileName = `${Date.now()}-${file.name}`;
        const newFilePath = join(uploadDir, newFileName);
        await writeFile(newFilePath, buffer);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const newUrl = `${baseUrl}/uploads/${newFileName}`;
        
        await Image.findByIdAndUpdate(id, {
            names: names,
            url: newUrl,
            data: buffer,
            contentType: file.type
        }, { new: true });

        const oldFileName = image.url.split('/').pop();
        const oldFilePath = join(uploadDir, oldFileName);

        if (existsSync(oldFilePath)) {
            unlinkSync(oldFilePath);
        }

        return NextResponse.json({ response: "បានកែប្រែទុកជោគជ័យ", success: true });
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ response: "Failed", success: false, error: error.message }, { status: 500 });
    }
};


export const GET = async (request, {params}) => {
    const {id} =  params;
    await connectDB();
    const product = await Image.findOne({_id: id})
    return NextResponse.json({product}, {status: 200})
}