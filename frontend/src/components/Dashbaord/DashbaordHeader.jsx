import { Banknote, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import useAuthStore from '@/lib/store/authStore'
import { useQueryClient } from '@tanstack/react-query'
import {  useNavigate } from 'react-router'

const DashbaordHeader = () => {
  const {user, clearAuth} = useAuthStore()
    const queryCleint = useQueryClient()
    const navigate = useNavigate()
  const handleLogout = () => {
    if(confirm('Are you sure you want to logout?')) {
      clearAuth()
        queryCleint.clear();
        navigate('/login', { replace: true})
    }
  }
  return (
    <div className='bg-card border-b border-border shadow-sm'>
        <div className='w-full px-4 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg'>
              <Banknote className='h-8 w-8 ' />
            </div>
            <h1 className='text-xl font-semibold text-foreground'>Transaction Dashbaord</h1>
            </div>

            <div className='flex items-center gap-3'>
                <span className='text-sm text-muted-foreground'>Welcome,{" "} 
                  <span className='font-medium text-foreground'>{user?.name || "User"}</span>
                </span>
                <Button variant='outline' onClick={handleLogout}>
                  <LogOut />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default DashbaordHeader