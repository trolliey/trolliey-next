import React, { ReactElement, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface Props {
  data: any
}

let count = 0
let slideInterval: NodeJS.Timer

function Carousel({ data }: Props): ReactElement {
  const slideRef = useRef<any>()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [show_indicators, setShowIndicators] = useState<boolean>(false)

  const handleOnNextClick = () => {
    count = (count + 1) % data.length
    setCurrentIndex(count)
    slideRef?.current?.classList.add('fade-anim')
  }

  const handleOnPrevClick = () => {
    const productsLength = data.length
    count = (currentIndex + productsLength - 1) % productsLength
    setCurrentIndex(count)
    slideRef?.current?.classList.add('fade-anim')
  }
  const removeAnimation = () => {
    slideRef.current?.classList.remove('fade-anim')
  }

  useEffect(() => {
    let cancelRequest = false
    startSlider()
    slideRef.current?.addEventListener('animationend', removeAnimation)
    slideRef.current?.addEventListener('mouseenter', pauseSlider)
    slideRef.current?.addEventListener('mouseleave', startSlider)
    if (cancelRequest) return

    return function cleanup() {
      cancelRequest = true
    }
  }, [])

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick()
    }, 3000)
  }

  const pauseSlider = () => {
    clearInterval(slideInterval)
  }
  return (
    <div className="m-auto max-w-7xl">
      <div
        onMouseEnter={() => setShowIndicators(true)}
        onMouseLeave={() => setShowIndicators(false)}
        ref={slideRef}
        className="relative w-full cursor-pointer select-none md:rounded"
      >
        <div className="aspect-w-16 aspect-h-9 overflow-hidden md:rounded">
          <Image
            src={data[currentIndex].image}
            placeholder="blur"
            quality={50}
            loading="eager"
            alt={data[0].body}
            className="md:rounded"
          />
        </div>

        <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform items-start justify-between px-3">
          {show_indicators && (
            <>
              <button
                onClick={handleOnPrevClick}
                className="rounded-full bg-gray-100 p-2"
              >
                <ChevronLeftIcon
                  height={20}
                  width={20}
                  className="text-gray-700"
                />
              </button>
              <button
                onClick={handleOnNextClick}
                className="rounded-full bg-gray-100 p-2"
              >
                <ChevronRightIcon
                  height={20}
                  width={20}
                  className="text-gray-700"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Carousel
