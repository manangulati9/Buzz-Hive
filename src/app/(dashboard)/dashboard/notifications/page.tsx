import Notificationlist from '@/components/dashboard/notifications/Notificationlist'
import React from 'react'

function page() {
  return (
    <div className='h-[100dvh] container flex justify-between items-center py-10'>
      <Notificationlist/>
    </div>
  )
}

export default page
