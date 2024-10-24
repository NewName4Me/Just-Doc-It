import React from 'react'
import Present from '@assets/Present.svg'

function Free() {
    return (
        <article className='flex items-center mt-[-1rem]'>
            <img src={Present} alt="" className='w-8 mr-2' />
            <p><span className='text-success'>100% off</span> for everyone</p>
        </article>
    )
}

export default Free