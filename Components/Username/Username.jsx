import React from 'react'
import { BadgeCheckIcon } from '@heroicons/react/solid'

function Username({ className, name, verified }) {
    return (
        <div className={`${className} flex flex-row items-center ml-2 font-semibold text-gray-900`}>
            <p>{name}</p>
            {verified && <BadgeCheckIcon height={16} width={16} className="text-blue-600 ml-2" />}
        </div>
    )
}

export default Username
