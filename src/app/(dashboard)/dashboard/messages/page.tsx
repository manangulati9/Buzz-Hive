import Messagelist from '@/components/dashboard/messages/Messagelist'
import React from 'react'

function Page() {
  return (
    <div className='h-[100dvh] container max-w-5xl flex justify-between items-center py-10'>
      <Messagelist />
    </div>
  )
}

export default Page
