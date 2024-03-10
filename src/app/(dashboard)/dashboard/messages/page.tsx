import Messagelist from '@/components/dashboard/messages/Messagelist'
import React from 'react'

function page() {
  return (
    <div className='h-[100dvh] container flex justify-between items-center py-10'>
      <Messagelist/>
    </div>
  )
}

export default page
