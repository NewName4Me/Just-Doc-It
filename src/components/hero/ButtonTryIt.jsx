import React from 'react'
import { Link } from 'react-router-dom'
import logoBlack from '@assets/logoBlack.png'


function ButtonTryIt() {
    return (
        <Link
            to='/upload'
            className='bg-[#FFBE1A] flex items-center justify-center px-5 h-14 rounded-lg shadow-md hover:bg-[#FFAA00] no-underline max-w-fit'
        >
            <img src={logoBlack} alt="Logo" className='w-4 h-auto mr-2' />
            <p className='text-black font-semibold'>Try - Just Doc It</p>
        </Link>
    )
}

export default ButtonTryIt