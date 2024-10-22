import React from 'react'
import { Link } from 'react-router-dom'
import Header from '@components/header'
import Titles from '@components/hero/Titles'
import logoBlack from '../../assets/logoBlack.png'

function Index() {
    return (
        <>
            <Header />
            <main className='pt-20 pl-16'>
                <Titles />
                <Link
                    className='bg-[#FFBE1A] flex items-center justify-center px-5 h-14 rounded-lg shadow-md hover:bg-[#FFAA00] no-underline max-w-fit'
                >
                    <img src={logoBlack} alt="Logo" className='w-4 h-auto mr-2' />
                    <p className='text-black font-semibold'>Try - Just Doc It</p>
                </Link>


            </main>
        </>
    )
}

export default Index
