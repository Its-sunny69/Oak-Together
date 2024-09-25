import React from 'react'

function HeroSection() {
    return (
        <>
            <div className='w-full flex justify-center items-center my-5 py-24'>
                <div className='w-1/2'>
                    <div className='flex justify-start items-center'>
                        <img src="../src/assets/logo.png" alt="" className='w-10 mr-4' />
                        <p className='bg-gradient-79 from-[#60D6D9] from-50% to-[#9AEBA5] to-100% text-transparent bg-clip-text font-semibold text-xl tracking-widest'>OAK TOGETHER</p>
                    </div>

                    <div className='my-4'>
                        <p className='text-5xl font-bold tracking-widest'>
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
                            <div class="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                                <div class="flex h-full w-full items-center justify-center rounded-md px-16 py-1.5 bg-white hover:bg-gradient-120 hover:from-[#83E2C1] hover:from-50% hover:to-[#1566E7] hover:to-100% hover:text-white back">
                                    <p>LogIn</p>
                                </div>
                            </div>
                        </button>
                        <button className='px-16 py-2 ml-4 rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% text-white hover:opacity-50'>Sign Up</button>
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