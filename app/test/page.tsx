'use client'

import React, { useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Test() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return

        if (session?.user?.email) {
            router.push('/test')
        } else {
            router.push('/')
        }
    }, [session, status, router])

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' })
    }

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>
            {session?.user?.email ? (
                <>
                    <p>{session.user.email}</p>
                    <button
                        onClick={handleSignOut}
                        className='text-red-500'>
                        Sign out
                    </button>
                </>
            ) : (
                <p>Not authenticated</p>
            )}
        </div>
    )
}
