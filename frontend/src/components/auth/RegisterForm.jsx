import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const RegisterForm = () => {
  return (
    <Card className='w-full border-border'>
            <CardHeader className='space-y-1 pb-4'>
                <CardTitle className={'text-xl text-center'}>Create an account</CardTitle>
                <CardDescription className={'text-center'}>
                Enter your details to register
                </CardDescription>
                <form>
                    <CardContent>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>Full name</div>
                        </div>
                       <Input name="name" 
                       placeholder='john Doe'
                       required
                       />
                       <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>Email</div>
                        </div>
                       <Input name="Email" 
                       placeholder='john@gmail.com'
                       required
                       />
                       <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>Password</div>
                        </div>
                       <Input name="name" 
                       placeholder='**************'
                       required
                       />
                       <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>Confirm Password</div>
                        </div>
                       <Input name="name" 
                       placeholder='**************'
                       required
                       />
                      <div className='py-6'>
                             <Button className={'w-full cursor-pointer'}>Create account</Button>
                      </div>
                    </CardContent>
                    <CardFooter className={'flex justify-center pt-0'}>
                        <div className='text-center text-sm'>Already have an account?
                            <a className='text-primary hover:underline cursor-pointer' href='#'>
                                Sign in
                                </a>
                        </div>
                    </CardFooter>
                </form>
            </CardHeader>
    </Card>
  )
}

export default RegisterForm