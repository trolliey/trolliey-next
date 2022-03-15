import React from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'

function About() {
  return (
    <GeneralLayout
      title="About Trolliey"
      description="What is trolliey and what is it about"
      no_text
    >
      <div className="flex min-h-screen w-full">
        <h1 className="py-8 text-center text-3xl font-semibold text-gray-900">
          About Page
        </h1>
      </div>
    </GeneralLayout>
  )
}

export default About
