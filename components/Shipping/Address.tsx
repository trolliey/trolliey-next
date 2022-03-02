import React, { ReactElement } from 'react'

interface Props{
    setFullName:any
}

function Address({setFullName}:Props):ReactElement {
    return (
        <form>
            <div className="mb-6">
                <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                <input 
                    type="fullname" 
                    id="fullname" 
                    onChange={e=> setFullName(e.target.value)}
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 " placeholder="full anme" 
                    required 
                />
            </div>
            <div className="mb-6">
                <label htmlFor="province" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                <input 
                    type="province" 
                    id="province" 
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 " placeholder="Province" 
                    required 
                />
            </div>
            <div className="mb-6">
                <label 
                    htmlFor="city" 
                    className="block mb-2 text-sm font-medium text-gray-900">City</label>
                <input 
                    type="city" 
                    id="city" 
                    placeholder='city'
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-primary focus:border-blue-primary block w-full p-2.5 " 
                    required />
            </div>
           
            <button 
                type="submit" 
                className="text-white bg-blue-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:hover:bg-blue-primary dark:focus:ring-blue-800 ml-auto">Next</button>
        </form>
    )
}

export default Address