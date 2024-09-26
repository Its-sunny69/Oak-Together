import React from 'react'

function Navbar() {
    return (
        <div>
            <nav className=' flex justify-center items-center'>
                <ul className='w-full flex justify-between items-center'>
                    <div>
                        <li>
                            <img src="../src/assets/logo.png" alt="" className='w-14' />
                        </li>
                    </div>

                    <div className='w-[30%] flex justify-between items-center'>
                        <li>Home</li>
                        <li>Features</li>
                        <li>Glimps</li>
                        <li>About</li>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button>
                            <div className="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                                <div className="flex h-full w-full items-center justify-center rounded-md px-[1.375rem] py-1.5 bg-white hover:bg-gradient-120 hover:from-[#83E2C1] hover:from-50% hover:to-[#1566E7] hover:to-100% hover:text-white back">
                                    <p>LogIn</p>
                                </div>
                            </div>
                        </button>
                        <button className='px-6 py-2 ml-4 rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% text-white hover:opacity-50'>Sign Up</button>
                    </div>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar