import React from 'react'

function Titles() {
    return (
        <section>
            <h1 className='text-6xl font-extrabold text-[#cfcfcf] '>
                From code to docs&nbsp;
                <span className='relative text-[#2E1A05]'>
                    <span
                        className='absolute inset-0 mt-1 mx-[-0.5rem] bg-[#D2CBC6] rotate-[-1deg] -z-10'
                        style={{
                            content: '""',
                            transformOrigin: 'center',
                            display: 'block',
                        }}
                    ></span>
                    in seconds
                </span>
            </h1>
            <h2 className='text-[#CFCFCF] opacity-80 text-base tracking-normal leading-snug mt-[-1.5rem]'>
                Speed up development with clear and concise documentation, perfect for collaborating with your team or sharing your project with others.
            </h2>
        </section>
    )
}

export default Titles