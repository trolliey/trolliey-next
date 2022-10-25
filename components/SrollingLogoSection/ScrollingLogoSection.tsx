import React from 'react'
import samsung from '../../public/img/samsung.svg'
import defy from '../../public/img/defy.svg'
import kenwood from '../../public/img/kenwood-logo.svg'
import dell from '../../public/img/dell-logo.svg'
import oppo from '../../public/img/oppo-logo.svg'
import HomeBrandItem from '../HomeBrandItem/HomeBrandItem'

type Props = {}

function ScrollingLogoSection({}: Props) {
  const home_brands = [
    { image: samsung, alt_text: 'sumsung brand' },
    { image: defy, alt_text: 'defy brand' },
    { image: kenwood, alt_text: 'kenwood brand' },
    { image: dell, alt_text: 'dell brand' },
    { image: oppo, alt_text: 'oppo brand' },
    { image: oppo, alt_text: 'oppo brand' },
  ]

  return (
    <div className="slider">
    <ul>
        {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
         {home_brands.map((item, index)=>(
            <li key={index}>
                <HomeBrandItem image={item.image} alt_text={item.alt_text} />
            </li>
        ))}
       
        
    </ul>
    </div>
  )
}

export default ScrollingLogoSection
