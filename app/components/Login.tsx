'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // const info = {
        //     email,
        //     password,
        // };

        // try {
        //     const res = await signIn("credentials", { email, password, redirect: false });

        //     if (!res?.error) {
        //         const response = await fetch("http://localhost:3000/api/login", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify(info)
        //         });

        //         if (response.status === 400 || response.status === 409) {
        //             const data = await response.json();
        //             setMsg(data.msg);
        //         } else {
        //             router.push('/test');
        //         }
        //     } else {
        //         setMsg("Invalid email or password.");
        //     }
        // } catch (err) {
        //     console.log(err);
        //     setMsg("An error occurred. Please try again.");
        // } finally {
        //     setLoading(false);
        // }


        try{
         const res =  await signIn('credentials', {
                email, password,redirect: false
            })

            if(res?.error){
                alert("Error credicital")
                return;
            }

            router.replace("test")
        }
        catch(err){
            console.log(err)
        }

        
    };

    return (
        <div>
            <div className='w-1/4 mx-auto bg-white shadow p-10 mt-10'>
                <form onSubmit={handleLogin} className='space-y-2'>
                    <div className='text-center text-2xl'>ប្រើប្រាស់ស៊ីស្ទឹម</div>
                    {msg && <div className='bg-red-500 p-2 text-white'>{msg}</div>}
                    <div>
                        <label htmlFor="email">អ៊ីម៉ែល</label>
                        <input 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className='border-2 w-full p-2' 
                            placeholder='អ៊ីម៉ែល' 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">ពាក្យសម្ងាត់</label>
                        <input 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type="password" 
                            className='border-2 w-full p-2' 
                            placeholder='ពាក្យសម្ងាត់' 
                            required
                        />
                    </div>
                    <div className='flex justify-end space-x-2'>
                        <button 
                            type="submit" 
                            className='border-2 p-2 text-black mt-2 text-md hover:border-indigo-500 transition-all duration-300 ease-in-out'
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "ចូលប្រើប្រាស់"}
                        </button>

                        <Link href="/register" className='border-2 p-2 text-black mt-2 text-md hover:border-indigo-500 transition-all duration-300 ease-in-out'>
                            បង្កើត
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
