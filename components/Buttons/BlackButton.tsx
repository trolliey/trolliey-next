import React, { ReactElement } from 'react'

interface Props {
    outline?: boolean,
    text?: any,
    onClick?: any,
    className?: string,
    loading?: boolean
}

function BlackButton({ outline, text, onClick, className, loading }: Props): ReactElement {
    return (
        <button
            onClick={onClick ? onClick : () => console.log('no action available')}
            className={`${className} ${outline ? "text-black bg-white border hover:bg-gray-900 hover:text-white" : "bg-black text-white hover:bg-gray-900 "} rounded outline-none border-blue-primary `}>
            {
                loading ? (
                    <div className="text-sm font-semibold md:p-3 p-2 capitalize">{text}</div>
                    
                ):(
                    <div className="text-sm font-semibold md:p-3 p-2 capitalize">Loading ... </div>
                )
            }
            
        </button>
    )
}

export default BlackButton