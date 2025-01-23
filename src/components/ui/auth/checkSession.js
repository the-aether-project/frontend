"use client"


import  { useEffect} from 'react'
import { useSession } from '../SessionProvider'
import { useRouter } from 'next/navigation'


export function usecheckSession() {
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
   
   
}

export function LoginStatusCheck(){
const {session,status}=useSession()
const router=useRouter()
    const LoginStatusCheck = async () => {

        useEffect(() => {
            if (session) {
                router.push('/dashboard')
                console.log("There is session")
                console.log("session username is ", session.username)
            }
        }, [session, router])
    }
    LoginStatusCheck();

return{LoginStatusCheck}
}


