import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '@components/header/HeaderIndex';

function ResultIndex() {
    const location = useLocation();
    const { uploadedFiles, language } = location.state || {};

    console.log('Uploaded Files:', uploadedFiles); // Para verificar qué datos se reciben
    console.log('Language:', language); // Para verificar el lenguaje recibido

    const languageExtension = {
        js: '.js',
        php: '.php',
        py: '.py',
    }[language] || '';

    const filteredFiles = uploadedFiles?.filter(file =>
        file.name.endsWith(languageExtension)
    );

    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16'>
                <h1 className='text-white text-3xl mb-8'>Archivos para {language.toUpperCase()}</h1>
                <section className='ml-14 border-l-4 border-warning'>
                    {filteredFiles && filteredFiles.length > 0 ? (
                        <ul className='list-disc ml-3'>
                            {filteredFiles.map((file, index) => {
                                const uniqueId = `${index}-${file.name}`;

                                return (
                                    <li key={uniqueId} className='text-white flex items-center'>
                                        <span className='w-5 h-5 rounded-full bg-success mr-4'></span>
                                        <Link
                                            to={`/result/${uniqueId}`}
                                            state={{ uploadedFiles, language }}
                                            className='text-white hover:underline text-lg'
                                        >
                                            {file.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className='text-white text-xl'>No se encontraron archivos con la extensión <strong>{languageExtension}</strong>.</p>
                    )}
                </section>
            </main>
        </>
    );
}

export default ResultIndex;
