import React from 'react'

function MobileProductItemLoading() {
  return (
    <div className='w-full flex-1'>
    <div className=" p-1 w-full mx-auto rounded-lg">
        <div className="relative animate-pulse group flex flex-row space-x-4">
            <div className="rounded-lg overflow-hidden h-24 w-24 bg-gray-400 aspect-w-1 aspect-h-1 group-hover:opacity-75"></div>
            <div className="flex-1 flex-col flex space-y-4 py-1 w-full ">
                <div className="h-6 bg-gray-500 rounded w-3/4"></div>
                <div className="space-y-4 w-full flex flex-col">
                    <div className="h-4 bg-gray-500 rounded w-full"></div>
                    <div className="h-4 bg-gray-500 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default MobileProductItemLoading