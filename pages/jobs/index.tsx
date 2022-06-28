import React from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'

function Jobs() {
  return (
    <GeneralLayout
    og_url='jobs'
      title="Jobs at Trolliey"
      description="Find out if they are any job openings at Trolliey"
      no_text
    >
      <div className="flex min-h-screen w-full">
        <h1 className="py-8 text-center text-3xl font-semibold text-gray-900">
          We are hiring.
        </h1>
      </div>
    </GeneralLayout>
  )
}

export default Jobs
