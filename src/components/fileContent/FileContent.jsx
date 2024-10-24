import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from '@components/header/HeaderIndex';
import {
    procesarArchivosJs,
    procesarArchivosPhp,
    procesarArchivosPy
} from '@utils/procesarArchivosSegunLenguaje';

function FileContent() {
    const { id } = useParams();  // Obtener el ID de la ruta
    const location = useLocation();
    const { uploadedFiles, language } = location.state || {};  // Obtener la lista de archivos y el lenguaje del state

    // Verificar si uploadedFiles es undefined
    if (!uploadedFiles) {
        return <p className="text-white">No hay archivos disponibles.</p>;
    }

    // Filtrar el archivo correspondiente al ID
    const file = uploadedFiles.find((file, index) => `${index}-${file.name}` === id);

    if (!file) {
        return <p className="text-white">Archivo no encontrado.</p>;
    }

    // Leer el contenido del archivo
    const [fileContent, setFileContent] = React.useState('');

    React.useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            let content = e.target.result;  // Guardar el contenido del archivo

            // Objeto que mapea lenguajes a sus funciones de procesamiento
            const processors = {
                js: procesarArchivosJs,
                php: procesarArchivosPhp,
                py: procesarArchivosPy,
            };

            // Procesar el archivo según el lenguaje
            const processor = processors[language];
            if (processor) {
                content = processor(content); // Llamar a la función de procesamiento
            } else {
                console.log('Lenguaje no soportado');
            }

            setFileContent(content); // Establecer el contenido del archivo para mostrar
        };
        reader.readAsText(file);  // Leer el archivo como texto

        // Cleanup
        return () => {
            reader.abort();  // Abortar la lectura del archivo si el componente se desmonta
        };
    }, [file, language]);

    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16'>
                <h1 className='text-white text-3xl mb-8'>Contenido de {file.name}</h1>
                <Link
                    to="/result"
                    state={{ uploadedFiles, language }} // Pasar el estado de uploadedFiles y language al volver
                    className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                >
                    Volver a la lista de archivos
                </Link>
                <pre className='text-white overflow-auto whitespace-pre-wrap'>
                    {fileContent}
                </pre>
            </main>
        </>
    );
}

export default FileContent;
