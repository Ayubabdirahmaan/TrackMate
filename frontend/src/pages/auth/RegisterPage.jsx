import RegisterForm from '@/components/auth/RegisterForm'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
                <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50'/>
                <div className='z-10 w-full max-w-md px-4'>
                    <div className='mb-8 text-center'>
                        <h1 className='text-3xl font-bold text-foreground'>Join us today</h1>
                        <p className=''>Create an account just a few steps</p>
                    </div>
                    {/* register foarm */}
                    <RegisterForm />
                </div>
                </div>
  )
}

export default RegisterPage