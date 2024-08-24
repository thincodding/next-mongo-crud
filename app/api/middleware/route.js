import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the Bearer scheme

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        return NextResponse.next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
    }
}
