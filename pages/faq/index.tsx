/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import GeneralLayout from '../../layouts/GeneralLayout'

const faqs = [
  {
    question: "How much does trolliey charge us to sell on Trolliey?",
    answer:
      "Managing your inventory and customers is totally from on Trolliey. However for every sucessfully purchase done we  deduct 10% including tax from the total amount",
  },
  {
    question: "How long does it take to receive a package after purchasing?",
    answer:
      "It takes not more than 10 working days for you to receive your product after you have purchased. Every buyer gets a free delivery on their first purchase",
  },
  // More questions...
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

function Faq() {
  return (
  <GeneralLayout og_url='faq' no_text title='Help and FAQ' description='Our help page and frequently asked questions about our platform'>
        <div className="min-h-screen">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? '-rotate-180' : 'rotate-0',
                              'h-6 w-6 transform'
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </GeneralLayout>
  )
}

export default Faq
