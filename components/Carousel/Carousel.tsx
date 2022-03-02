import React, { ReactElement, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface Props {
    data: any
}

let count = 0;
let slideInterval: NodeJS.Timer;

function Carousel({ data }: Props): ReactElement {
    const slideRef = useRef<any>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [show_indicators, setShowIndicators] = useState<boolean>(false)

    const handleOnNextClick = () => {
        count = (count + 1) % data.length;
        setCurrentIndex(count);
        slideRef?.current?.classList.add("fade-anim");
    };

    const handleOnPrevClick = () => {
        const productsLength = data.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef?.current?.classList.add("fade-anim");
    };
    const removeAnimation = () => {
        slideRef.current?.classList.remove("fade-anim");
    };

    useEffect(() => {
        startSlider();
        slideRef.current?.addEventListener("animationend", removeAnimation);
        slideRef.current?.addEventListener("mouseenter", pauseSlider);
        slideRef.current?.addEventListener("mouseleave", startSlider);
    }, []);

    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };
    return (
        <div className="max-w-7xl m-auto">
            <div onMouseEnter={() => setShowIndicators(true)}
                    onMouseLeave={() => setShowIndicators(false)} ref={slideRef} className="w-full cursor-pointer relative select-none">
                <div className="aspect-w-16 aspect-h-9">
                    <Image src={data[currentIndex].image} alt={data[0].body} />
                </div>

                <div
                    
                    className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
                    {
                        show_indicators && (
                            <>
                                <button onClick={handleOnPrevClick} className="p-2 bg-gray-100 rounded-full">
                                    <ChevronLeftIcon height={20} width={20} className="text-gray-700" />
                                </button>
                                <button onClick={handleOnNextClick} className="p-2 bg-gray-100 rounded-full">
                                    <ChevronRightIcon height={20} width={20} className="text-gray-700" />
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Carousel
