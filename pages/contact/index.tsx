import React from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'

function Contact() {
  return (
    <GeneralLayout
      title="Contact Trolliey"
      description="Find out how you can communicate with trolliey and its supporters"
      no_text
    >
      <div className="flex min-h-screen w-full">
        <h1 className="py-8 text-center text-3xl font-semibold text-gray-900">
          Contact Page
        </h1>
      </div>
    </GeneralLayout>
  )
}

export default Contact
