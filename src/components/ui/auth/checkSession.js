"use client"


import React, { useEffect, useState } from 'react'
import { useSession } from '../SessionProvider'
import { useRouter } from 'next/navigation'


export function checkSession() {
    const { session, status } = useSession();
    const router = useRouter()
    
    useEffect(() => {
        const checkSession = async () => {
            if (status === 'loading') {
                return; 
            }
            if (!session) {
                console.log("No session found by checksession")
                router.push('/login'); 
            }
        }
        checkSession();
    }, [session, status, router]);
   
    return { checkSession }
}

export function LoginStatusCheck(){
const {session,status}=useSession()
const router=useRouter()
    const LoginStatusCheck = async () => {

        useEffect(() => {
            if (status === 'authenticated') {
                router.push('/dashboard')
                console.log("There is session")
                console.log("session username is ", session.username)
            }
        }, [session, router])
    }
    LoginStatusCheck();

return{LoginStatusCheck}
}


