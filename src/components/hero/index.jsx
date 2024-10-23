import React from 'react'
import Header from '@components/header'
import Titles from '@components/hero/Titles'
import ButtonTryIt from '@components/hero/ButtonTryIt'
import Free from '@components/hero/Free'
import Upload from '@components/hero/Upload'

function Index() {
    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16 flex gap-9  items-center'>
                <section className='w-1/2 '>
                    <Titles />
                    <ButtonTryIt />
                    <Free />
                </section>
                <section className='w-1/2 flex items-center justify-center flex-col'>
                    <Upload />
                </section>
            </main >
        </>
    )
}

export default Index

