import React from 'react'
import LoginButton from './LoginButton'
import SignUpButton from './SignUpButton'

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
                            <div class="rounded-lg bg-gradient-120 from-[#83E2C1] from-50% to-[#1566E7] to-100% p-[2px]">
                                <LoginButton />
                            </div>
                        </button>
                        <SignUpButton />
                    </div>

                </ul>
            </nav>
        </div>
    )
}

export default Navbar