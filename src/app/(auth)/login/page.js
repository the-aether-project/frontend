'use client'
import { useState, useEffect } from 'react'
import { useSession } from '@/components/ui/SessionProvider'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { verifySession } from '@/hooks/useSessionToken'
import { checkSession } from '@/components/ui/auth/checkSession'


import "@/app/globals.css"
import { use } from 'react'

const Login = () => {
  const router = useRouter()
  
  const { session,status, setSession, setStatus,setLoading } = useSession()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    document.title = "Login • Aether"
  }, [])
  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push('/lobby')
      console.log("There is session")
      console.log("session username is: ", session.username)
    }
  }, [session, router])
  checkSession();
 
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors.auth) {
      setErrors((prev) => ({ ...prev, auth: '' }));
    }
    if (errors[name]){
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:7878/api/authenticate-user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      console.log("response status:",response.status)
      if (!response.ok) {
        const errorResponse = await response.json() // Parse error message from server
        setErrors({
          auth: errorResponse.message || 'Invalid email or password'
        })
        return;
      } else {
        const data = await response.json()
        localStorage.setItem('access_token', data.access_token) // Save token to local storage
        await verifySession(setSession, setStatus,setLoading) // Verify session after getting the token
 
      setErrors({})
      console.log("token:", data.access_token)
      console.log("status", status)
      console.log("message", data.message)
       
      }
    } catch (error) {
      console.error('Error during login',error);
      setErrors({ auth: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = (provider) => {
    
    if (provider === 'github') {
      window.location.href = 'http://localhost:7878/api/authenticate-github';
      console.log("github")
    } else if (provider === 'google') {
      window.location.href = 'http://localhost:7878/api/authenticate-google';
    }
    verifySession(setSession, setStatus,setLoading)
    
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-[1128px] mx-auto py-10">
        <div className="mt-8 px-4">
          {/* the below div contains that inner portion */}
          <div className="max-w-[520px] mx-auto bg-muted rounded-lg p-6 shadow-2xl">
            <h1 className="text-center text-3xl font-semibold mb-4">Sign in</h1>
            <p className="text-center text-sm text-foreground-muted mb-6">
              Transforming unused resources into limitless possibilities.
            </p>

            {errors.auth && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {errors.auth}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <FaEye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 font-medium text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="relative mb-0 mt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-500"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-muted text-gray-500">or</span>
              </div>
            </div>

            <p className='text-xs p-4'>
              By clicking Continue, you agree to Aether's{' '}
              <a href="" className='text-[#2563eb]'>User Agreement</a>,{' '}
              <a href="" className='text-[#2563eb]'>Privacy Policy</a>, and{' '}
              <a href="" className='text-[#2563eb]'>Cookie Policy</a>.
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleOAuthSignIn('google')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-muted-foreground"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5 mr-3"
                />
                <span className="font-medium">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn('github')}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-muted-foreground"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-5 w-5 mr-3"
                />
                <span className="font-medium">Continue with GitHub</span>
              </button>
            </div>


          </div>
          <p className="text-center mt-8 text-lg">
            New to Aether?{' '}
            <Link href="/signup" className="text-blue-600 font-medium hover:underline">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

