import React, { ReactElement } from 'react'

interface Props {
    outline?: boolean,
    text?: string,
    onClick?: any,
    className?: string,
    loading?: boolean
}

function RedButtons({ outline, text, onClick, className, loading }: Props): ReactElement {
    return (
        <button
            type="button"
            onClick={onClick ? onClick : () => console.log('no action available')}
            className={`${className} ${outline ? "text-new-primary bg-white border hover:bg-new-primary hover:text-white" : "bg-new-primary text-white hover:bg-new-light "} rounded outline-none border-new-primary `}>
            <p className="text-sm font-semibold md:p-3 p-2 capitalize">{text}</p>
        </button>
    )
}

export default RedButtons