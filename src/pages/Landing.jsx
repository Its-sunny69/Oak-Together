import React from 'react'
import Navbar from '../components/Navbar'

function Landing() {
    return (
        <>
            <Navbar />

            <div className='w-full flex'>
                <div className='w-1/2'>
                    <div className='flex justify-start items-center'>
                        <img src="../src/assets/logo.png" alt="" className='w-10'/>
                        <p>OAK TOGETHER</p>
                    </div>
                    <div></div>
                    <div></div>
                </div>
                <div className='w-1/2 bg-blue-200'></div>
            </div>
        </>
    )
}

export default Landing