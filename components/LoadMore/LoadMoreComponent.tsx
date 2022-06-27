import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import React, { useMemo } from 'react'

interface LoadMoreProps {
  setPage: any
  page: number
  totalPages: number,
  pageSize?:number
}

const range = (start: number, end: number) => {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export const DOTS = '...'
var siblingCount = 1

// pagination component
// @param {state} - result from api call
// @notice {setPage} - hook to set the function
// @param {page} - the number of page being viewed
const LoadMoreComponent = ({ setPage, page, totalPages, pageSize }: LoadMoreProps) => {
  
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalPages / (pageSize ? pageSize : 16));

    // Pages count is determined as siblingCount + firstPage + lastPage + page + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      page + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, pageSize, siblingCount, page]);

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
        {Array.from(Array(totalPages).keys())?.map(
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
            page === totalPages ? 'hidden ' : 'flex '
          } cursor-pointer text-blue-primary hover:text-gray-700`}
        >
          <ChevronRightIcon height={32} width={32} />
        </div>
      </div>
    </div>
  )
}

export default LoadMoreComponent
