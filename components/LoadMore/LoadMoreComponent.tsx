import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React from 'react'

interface LoadMoreProps {
    state: any
    setPage: any
    page: number
  }
  
// pagination component
// @param {state} - result from api call
// @notice {setPage} - hook to set the function
// @param {page} - the number of page being viewed
const LoadMoreComponent = ({ state, setPage, page }: LoadMoreProps) => {
    return (
      <div className="flex self-center pt-8">
        <div className="flex flex-row items-center">
          <div
            onClick={() => setPage(page - 1)}
            className={`${
              page === 1 ? 'hidden ' : 'flex '
            } cursor-pointer text-blue-primary hover:text-gray-700`}
          >
            <ChevronLeftIcon height={32} width={32} />
          </div>
          {Array.from(Array(state?.data.meta.totalPages).keys())?.map(
            (item: number, index: number) => (
              <div
                key={index}
                onClick={() => setPage(item + 1)}
                className={`${
                  item + 1 === page
                    ? 'bg-blue-primary text-white '
                    : 'cursor-pointer bg-white text-blue-primary hover:bg-gray-200 '
                } flex border border-gray-200 py-2 px-3 text-sm`}
              >
                {item + 1}
              </div>
            )
          )}
          <div
            onClick={() => setPage(page + 1)}
            className={`${
              page === state?.data.meta.totalPages ? 'hidden ' : 'flex '
            } cursor-pointer text-blue-primary hover:text-gray-700`}
          >
            <ChevronRightIcon height={32} width={32} />
          </div>
        </div>
      </div>
    )
  }

export default LoadMoreComponent