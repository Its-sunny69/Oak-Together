import React from 'react'
import LoginButton from './LoginButton'
import SignUpButton from './SignUpButton'

function HeroSection() {
    return (
        <>
            <div className='w-full flex justify-center items-center my-5 mt-28'>
                <div className='w-1/2'>
                    <div className='flex justify-start items-center'>
                        <img src="../src/assets/logo.png" alt="" className='w-10 mr-4' />
                        <p className='bg-gradient-79 from-[#60D6D9] from-50% to-[#9AEBA5] to-100% text-transparent bg-clip-text font-semibold text-xl tracking-widest'>OAK TOGETHER</p>
                    </div>

                    <div className='my-4'>
                        <p className='text-4xl font-bold tracking-widest'>
                            CULTIVATE A <br />
                            GREENER WORLD,<br />
                            ONE PLANT AT A TIME.
                        </p>

                        <p className=' text-gray-500'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>

                    <div className='mt-20'>
                        <button>
                            <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                                <LoginButton />
                            </div>
                        </button>
                        <SignUpButton />
                    </div>
                </div>
                <div className='w-1/2'>
                <img src="../src/assets/gradient-people-planting-tree-illustration.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default HeroSection