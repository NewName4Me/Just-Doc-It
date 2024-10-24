import React, { useState } from 'react';
import Header from '@components/header/HeaderIndex';
import Buttons from '@components/upload/buttons';
import Marco from '@assets/marquito.svg';
import UploadRecto from '@assets/UploadRecto.svg';

function Index() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputElement = event.target.querySelector('input[type="file"]');
        const languageElement = event.target.querySelector('select[name="language"]');

        const uploadedFiles = Array.from(inputElement.files);
        const language = languageElement.value;

        setSelectedFiles(uploadedFiles);
        setSelectedLanguage(language);
    };

    return (
        <>
            <Header />
            <form className='h-screen pt-32 flex justify-center relative' action='#' method="GET" onSubmit={handleSubmit}>
                <Buttons />
                <figure className='absolute top-1/4'>
                    <img src={Marco} alt="" className='max-w-2xl' />
                    <img src={UploadRecto} alt="" className='max-w-2xl absolute top-2/4 left-1/2 -translate-x-1/2 -translate-y-2/3' />
                    <label className='font-semibold w-full text-2xl text-info absolute top-3/4 left-1/2 -translate-x-1/2 flex justify-center' style={{ width: 'fit-content' }}>
                        <span className='sr-only'>Subir carpetas</span>
                        <input
                            type="file"
                            className='hidden'
                            directory=""
                            webkitdirectory=""
                        />
                        <span className='text-info cursor-pointer text-center'>
                            Subir carpetas o Conectar con <span className='text-secondary'>Github (proximamente)</span>
                        </span>
                    </label>
                </figure>
            </form>
        </>
    );
}

export default Index;
