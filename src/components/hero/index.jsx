import React from 'react'
import Header from '@components/header'
import Titles from '@components/hero/Titles'
import ButtonTryIt from '@components/hero/ButtonTryIt'

function Index() {
    return (
        <>
            <Header />
            <main className='pt-20 pl-16 flex gap-9'>
                <section className='w-1/2'>
                    <Titles />
                    <ButtonTryIt />
                </section>
                <section className='w-1/2'>

                </section>
            </main>
        </>
    )
}

export default Index
