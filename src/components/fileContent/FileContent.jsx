import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from '@components/header/HeaderIndex';

function FileContent() {
    const { id } = useParams();  // Obtener el ID de la ruta
    const location = useLocation();
    const { uploadedFiles } = location.state || {};  // Obtener la lista de archivos del state

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
            setFileContent(e.target.result);  // Guardar el contenido del archivo
        };
        reader.readAsText(file);  // Leer el archivo como texto

        // Cleanup
        return () => {
            reader.abort();  // Abortar la lectura del archivo si el componente se desmonta
        };
    }, [file]);

    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16'>
                <h1 className='text-white text-3xl mb-8'>Contenido de {file.name}</h1>
                <Link
                    to="/result"
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
