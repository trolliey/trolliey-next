import React from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'

function About() {
  return (
    <GeneralLayout
      title="About Trolliey"
      description="What is trolliey and what is it about"
      no_text
    >
      <div className="relative overflow-hidden bg-white py-16 min-h-screen">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-dark">
                About Us
              </span>
              <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                Trolliy Retail
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-500">
              We are an online retailing platform for Zimbabwean buyer,
              suppliers, and manufacturers. We are customer oriented meaning we
              put the needs of the customer over the needs of the business
              because we believe customers are the business
            </p>
          </div>
          <div className="mx-auto max-w-prose text-lg">
            <h2>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-dark">
                Our Vision
              </span>
            </h2>
            <ul>
              <li className="mt-8 text-xl leading-8 text-gray-500">
                To be the best online retailing plaform for buyers and sellers
              </li>
            </ul>
          </div>

          <div className="mx-auto max-w-prose text-lg">
            <h2>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-dark">
                Our Mission
              </span>
            </h2>
            <ul>
              <li className="mt-8 text-xl leading-8 text-gray-500">
                Putting more smiles on faces and saving more dollars in your pocket
              </li>
            </ul>
          </div>

          <div className="mx-auto max-w-prose text-lg">
            <h2>
              <span className="block text-center text-base font-semibold uppercase tracking-wide text-blue-dark">
                Our Values
              </span>
            </h2>
            <ul>
              <li className="mt-8 text-xl leading-8 text-gray-500">
                Our work will be guided and informed by our beliefs and commitments to inclusiveness - we respect people, 
                value diversity and committed to equality. Participation - we value and recognize the contribution of volunteers within organizations and communities
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default About
