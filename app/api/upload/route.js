"use server";

import { NextResponse } from "next/server";
import connectDB from "../../../config/database";
import { Image } from "../../../models/imageModels";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdirSync, existsSync, unlinkSync } from 'fs';

const uploadDir = join(process.cwd(), 'public/uploads');
if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

export const POST = async (request) => {
    try {
        await connectDB();

        const data = await request.formData();
        const file = data.get('file');
        const names = data.get("names");

        if (!file) {
            return NextResponse.json({ success: false, response: "No file provided" });
        }

        const bufferData = await file.arrayBuffer();
        const buffer = Buffer.from(bufferData);

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const url = `${baseUrl}/uploads/${fileName}`;
        await Image.create({
            names: names,
            url: url,
            data: buffer,
            contentType: file.type
        });

        return NextResponse.json({ response: "បានរក្សាទុកជោគជ័យ", success: true });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ response: "Failed", success: false, error: error.message });
    }
};


export const DELETE = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        await connectDB();

        const image = await Image.findById(id);
        if (!image) {
            return NextResponse.json({ msg: "Image not found" }, { status: 404 });
        }

        const fileName = image.url.split('/').pop();
        const filePath = join(uploadDir, fileName);

        if (existsSync(filePath)) {
            unlinkSync(filePath);
        }

        await Image.findByIdAndDelete(id);

        return NextResponse.json({ msg: "បានលុបដោយជោគជ័យ" }, { status: 200 });
    } catch (error) {
        console.error("Deletion error:", error);
        return NextResponse.json({ msg: "Failed to delete image", error: error.message }, { status: 500 });
    }
};

