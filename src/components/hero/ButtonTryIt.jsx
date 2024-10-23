import React from 'react'
import { Link } from 'react-router-dom'
import logoBlack from '@assets/logoBlack.png'


function ButtonTryIt() {
    return (
        <Link
            to='/upload'
            className='bg-warning flex items-center justify-center px-16 h-14 rounded-lg shadow-md no-underline max-w-fit'
        >
            <img src={logoBlack} alt="Logo" className='w-5 h-auto mr-4' />
            <p className='text-black font-semibold'>Try - Just Doc It</p>
        </Link>
    )
}

export default ButtonTryIt