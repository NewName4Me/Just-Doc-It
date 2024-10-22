import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoBlue from '@assets/logoBlue.png';
import { stopLinkUsage } from '@utils/headerHelper.js';

function index() {

    useEffect(() => {
        stopLinkUsage();
    }, []);



    return (
        <header>
            <nav className='flex items-center fixed w-full h-24 ml-8 mt-[-0.5rem] gap-4 no-underline'>
                <Link to='/'><img className="w-8" src={logoBlue} alt="logo" /></Link>
                <Link to='/' className='text-2xl no-underline font-bold text-white '>
                    Just Doc It
                </Link>
                <section className='ml-24 flex gap-16'>
                    <Link className='no-underline cursor-not-allowed' to='/pricing'>Pricing</Link>
                    <Link className='no-underline cursor-not-allowed' to='/dashboard'>Dashboard</Link>
                    <Link className='no-underline cursor-not-allowed' to='/documentation'>Documentation</Link>
                </section>
            </nav>
        </header>
    )
}

export default index


