import React from 'react'

function Titles() {
    return (
        <section>
            <h1 className='text-6xl font-extrabold text-neutral-content '>
                From code to
                <br />
                docs,&nbsp;
                <span className='relative text-primary-content opacity-100'>
                    <span
                        className='absolute inset-0 mt-1 mx-[-0.5rem] bg-neutral-content opacity-60 rotate-[-1deg] -z-10'
                        style={{
                            content: '""',
                            transformOrigin: 'center',
                            display: 'block',
                        }}
                    ></span>
                    in seconds
                </span>
            </h1>
            <h2 className='text-neutral-content opacity-80 tracking-normal leading-relaxed mt-[-1.5rem] font-light text-lg'>
                Speed up development with clear and concise documentation, perfect for collaborating with your team or sharing your project with others.
            </h2>
        </section>
    )
}

export default Titles