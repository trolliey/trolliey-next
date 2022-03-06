import React, { ReactElement } from 'react'

interface Props{
    message?:any
}

function SuccessAlert({message}:Props):ReactElement {
    return (
        <div className="bg-green-100 text-green-700 text-sm p-2 rounded w-full text-center my-1">
            {message}
        </div>
    )
}

export default SuccessAlert
