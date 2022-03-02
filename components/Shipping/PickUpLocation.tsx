import React, { ReactElement } from 'react';

function PickUpLocation():ReactElement {
    return (
        <div className="bg-white w-full items-center pb-4">
            <main className="flex flex-col">
                {/* Checkout form */}
                <section
                    aria-labelledby="payment-heading"
                    className=""
                >
                    <div className='mt-4 mx-4'>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Our Pick-Up locations</h3>
                        <p className="mt-1 text-sm text-gray-500">On pickup you can choose to pay on collection.</p>
                    </div>

                </section>

            </main>
        </div>
    );
}

export default PickUpLocation;
