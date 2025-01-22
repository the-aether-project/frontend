'use client'
import { useState, useEffect } from 'react'
import { useSession } from '@/components/ui/SessionProvider'
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Bounce } from 'react-toastify'
import "@/app/globals.css"
import AuthForm from '@/components/ui/form/AuthForm'
const Signup = () => {
  const {  session, status } = useSession()
  useEffect(() => {
    document.title = 'SignUp • Aether'
  }, [])
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors.auth) {
      setErrors((prev) => ({ ...prev, auth: '' }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
      console.log("There is session")
      console.log("session username is ", session.username)
    }
  }, [session, router])

  // Early return if session exists
  if (status === 'authenticated') {
    return null
  }
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8 || formData.password.length > 50) {
      newErrors.password = 'Password must be between 8 and 50 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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
      // Add your signup API call here
      const response = await fetch('http://localhost:7878/api/authenticate-user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })
     
      if (!response.ok) {
        const errorData = await response.json()
        setErrors({ auth: errorData.message || 'Something went wrong. Please try again.' })
        setIsLoading(false)
        return
      }
      // Assuming the response contains the session data
      const sessionData = await response.json()
      console.log("signup status:", sessionData.ok)
      console.log("signup message:", sessionData.message)
      
      toast('Signup Succesful! Please login to continue', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push('/login')
      }, 4500)
      
    } catch (error) {
      setErrors({ auth: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <  AuthForm
      isSignUp={true}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      formData={formData}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isLoading={isLoading}
    />

  )
}
export default Signup
