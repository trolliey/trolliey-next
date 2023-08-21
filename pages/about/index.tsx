import { useState } from 'react'
import GeneralLayout from '../../layouts/GeneralLayout'
import woman from '../../public/images/woman.jpeg'
import woman2 from '../../public/images/woman2.jpeg'

export default function About() {
  const OG_IMAGE =
    'https://res.cloudinary.com/trolliey/image/upload/v1656413342/trolliey%20static%20images/applytosell_aytff9.png'
  return (
    <GeneralLayout
      title="About Trolliey"
      description="What is trolliey and what is it about"
      no_text
      og_image={OG_IMAGE}
      og_url="about"
    >
      <div className="bg-white">
        {/* Header */}

        <main className="isolate">
          {/* Hero section */}
          <div className="relative isolate -z-10">
            <svg
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              />
            </svg>
            <div
              className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
              aria-hidden="true"
            >
              <div
                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                style={{
                  clipPath:
                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Putting Customers First in the Heart of Our Business
                    </h1>
                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                      We are an online retailing platform for Zimbabwean buyer,
                      suppliers, and manufacturers. We are customer oriented
                      meaning we put the needs of the customer over the needs of
                      the business because we believe customers are the business
                    </p>
                  </div>
                  <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <img
                          src={woman2.src}
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <img
                          src={woman.src}
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our mission
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full  lg:flex-auto">
                  <p className="text-xl leading-8 text-gray-600">
                    Our mission is to go beyond mere transactions and create
                    meaningful connections. We are dedicated to putting more
                    smiles on the faces of our valued customers, by providing
                    them with exceptional online retailing experiences. Through
                    our platform, we aim to save more dollars in your pocket,
                    ensuring that you not only find the products you need but
                    also secure the best deals available. We strive to make
                    every interaction count, fostering trust, convenience, and
                    satisfaction in every step of your journey with us. Join us
                    today and experience the joy of seamless online shopping in
                    Zimbabwe
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values section */}

          {/* Logo cloud */}
          <div className="relative isolate -z-10 mt-32 sm:mt-48">
            <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
              <svg
                className="h-[40rem] w-[80rem] flex-none stroke-gray-200"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                    width={200}
                    height={200}
                    x="50%"
                    y="50%"
                    patternUnits="userSpaceOnUse"
                    patternTransform="translate(-100 0)"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y="50%" className="overflow-visible fill-gray-50">
                  <path
                    d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                />
              </svg>
            </div>
            <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 lg:pb-72">
              <div className="mx-auto  lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our values
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our work will be guided and informed by our beliefs and
                  commitments to inclusiveness - we respect people, value
                  diversity and committed to equality. Participation - we value
                  and recognize the contribution of volunteers within
                  organizations and communities
                </p>
              </div>
            </div>

            {/* <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
              Trusted by the world’s most innovative teams
            </h2>
            <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div> */}
          </div>
        </main>
      </div>
    </GeneralLayout>
  )
}
