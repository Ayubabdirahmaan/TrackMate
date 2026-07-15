import DashbaordHeader from '@/components/Dashbaord/DashbaordHeader'
import DashboardWelcome from '@/components/Dashbaord/DashboardWelcome'
import TaskForm from '@/components/task/TaskForm'

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