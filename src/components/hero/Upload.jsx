import React from 'react'
import UploadImg from '@assets/Upload.svg'
import Arrow from '@assets/Arrow.svg'

function Upload() {
    return (
        <div className='pb-32'>
            <figure>
                <img src={UploadImg} alt="" className='' />
                <img src={Arrow} alt="" className='absolute top-72 right-24' />
            </figure>
            <p className='text-warning pl-6'>upload your entire project</p>
        </div>
    )
}

export default Upload
