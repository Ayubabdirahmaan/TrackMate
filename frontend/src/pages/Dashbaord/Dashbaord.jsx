import DashbaordHeader from '@/components/Dashbaord/DashbaordHeader'
import DashboardWelcome from '@/components/Dashbaord/DashboardWelcome'
import TaskForm from '@/components/task/TaskForm'
import api from '@/lib/api/apiClient'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'

import React, { useState } from 'react'

const Dashbaord = () => {

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [edtingTask, setEdtingTask] = useState(null)

  const handleCreateTask = () => {
    setShowCreateForm(true)
    setEdtingTask(null)
  }
  const handleFormClose = () => {
    setShowCreateForm(false),
      setEdtingTask(null)
  }

  const taskQuery = useQuery({
    queryKey: ['transaction'],
    queryFn: async () => {
      const response = await api.get('/transaction')
        console.log('tresponse is ',response);
      return response.data

    
    },
    retry: 1
  })

  if(taskQuery.isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader className='animate-spin' />
      </div>
    )
  }

  if(taskQuery.isError) {
    return (
      <div className='flex h-screen items-center justify-center'> 
        <p className='text-red-500'>Error loading transaction: {taskQuery.error.message}</p>
      </div>
    )
  }

  return (

    <div className='min-h-screen bg-background'>
      {/* header */}
      <DashbaordHeader />

      {/* main */}
      <main className='max-full px-4 py-8 space-y-6'>
        <DashboardWelcome
          showCreateForm={showCreateForm}
          onCreateTask={handleCreateTask}
        />
      </main>
      {/* task dialog form */}

      <TaskForm
        open={showCreateForm || !!edtingTask}
        onOpenChange={handleFormClose}
      />
    </div>
  )
}

export default Dashbaord