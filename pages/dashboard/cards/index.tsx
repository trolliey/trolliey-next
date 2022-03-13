import React, { useState } from 'react'
import CreditCard from '../../../components/DashboardCard/CreditCard'
import DashboardLayout from '../../../layouts/DashboardLayout'
import ecocash from '../../../public/img/eco_cash.svg'
import telecash from '../../../public/img/telecash1.png'

function Cards() {
    const [ecocash_method, setEcocash] = useState<any>('')
    const [telecash_method, setTelecash] = useState<any>('')
    return (
        <DashboardLayout>
             <p className='text-black font-bold my-8 text-center text-xl'>Your accounts</p>
            <div className="flex flex-col flex-1 md:m-4 m-2 bg-white rounded p-4 ">
                <p className="text-gray-700 font-semibold text-center capitalize mb-4">
                    Click on a card to change details
                </p>
                <div className="grid md:grid-cols-3 grid-cols-1 lg:gap-16 md:gap-4 gap-4">
                    <div className="col-span-1">
                        <CreditCard
                            type={'ecocash'}
                            number={'+2637 7144 5411'}
                            picture={ecocash}
                            user_name={'Tatenda Bako'}
                            date={Date.now()}
                            bg_color={'bg-gradient-to-r from-black to-gray-800 h-full'}
                        />
                    </div>
                    <div className="col-span-1">
                        <CreditCard
                            type={'telecash'}
                            number={'+2637 3870 5551'}
                            picture={telecash}
                            user_name={'Tatenda Bako'}
                            date={Date.now()}
                            bg_color={''}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Cards
