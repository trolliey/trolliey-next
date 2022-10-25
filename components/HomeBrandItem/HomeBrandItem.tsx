import Image from 'next/image'
import React from 'react'

interface Props {
  image?: any,
  alt_text:string
}

function HomeBrandItem({ image, alt_text }: Props) {
  return (
    <>
      <div className="relative h-4 w-10 md:h-6 md:w-16 mx-8">
        <Image quality={50} loading="eager" src={image} alt={alt_text} layout="fill" />
      </div>
    </>
  )
}

export default HomeBrandItem
