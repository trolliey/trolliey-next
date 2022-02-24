import React from 'react'

function RedButton({outline, text, onClick, className}) {
    return (
        <button 
        onClick={onClick ? onClick : ()=> console.log('no action available')} 
        className={`${className} ${outline ? "text-new-primary bg-white border hover:bg-new-primary hover:text-white" : "bg-new-primary text-white hover:bg-new-light "} rounded outline-none border-new-primary `}>
        <p className="text-sm font-semibold md:p-3 p-2 capitalize">{text}</p>
    </button>
    )
}

export default RedButton
