"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        // Build the payload to be sent to the API

        const payload = { name, email, password };

        try {
            // Make the API request to register the user
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                // Handle successful registration (e.g., redirect, show a message, etc.)
                router.push("/test")
            } else {
                // Handle errors (e.g., show error message)
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <div className='w-1/4 mx-auto bg-white shadow p-10 mt-10'>
                <form onSubmit={handleSubmit} className='space-y-2'>
                    <div className='text-center text-2xl'>បង្កើតថ្មី</div>

                    <div>
                        <label htmlFor="name">ឈ្មោះអ្នកប្រើ</label>
                        <input
                            type="text"
                            className='border-2 w-full p-2'
                            placeholder='ឈ្មោះអ្នកប្រើ'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email">អ៊ីម៉ែល</label>
                        <input
                            id="email"
                            type="email"
                            className='border-2 w-full p-2'
                            placeholder='អ៊ីម៉ែល'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password">ពាក្យសម្ងាត់</label>
                        <input
                            id="password"
                            type="password"
                            className='border-2 w-full p-2'
                            placeholder='ពាក្យសម្ងាត់'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type="submit"
                            className='border-2 p-2 text-black mt-2 text-md hover:border-indigo-500 transition-all duration-300 ease-in-out'
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
