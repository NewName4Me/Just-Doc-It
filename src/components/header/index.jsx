import React from 'react'
import { Link } from 'react-router-dom'
import logoBlue from '../../assets/logoBlue.png';

function index() {
    return (
        <header>
            <nav className='flex items-center fixed w-full h-24 ml-8 mt-auto gap-4 no-underline'>
                <Link to='/'><img className="w-8" src={logoBlue} alt="logo" /></Link>
                <Link to='/' className='text-2xl no-underline font-bold text-white '>
                    Just Doc It
                </Link>
                <section className='ml-24 flex gap-16'>
                    <Link className='no-underline' to='/pricing'>Pricing</Link>
                    <Link className='no-underline' to='/dashboard'>Dashboard</Link>
                    <Link className='no-underline' to='/documentation'>Documentation</Link>
                </section>
            </nav>
        </header>
    )
}

export default index


