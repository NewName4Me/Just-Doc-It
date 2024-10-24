import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import Header from '@components/header/HeaderIndex';
import { procesarArchivosJs } from '@utils/procesarArchivosSegunLenguaje';

function FileContent() {
    const { id } = useParams();
    const location = useLocation();
    const { uploadedFiles } = location.state || {};

    if (!uploadedFiles) {
        return <p className="text-white">No hay archivos disponibles.</p>;
    }

    const file = uploadedFiles.find((file, index) => `${index}-${file.name}` === id);

    if (!file) {
        return <p className="text-white">Archivo no encontrado.</p>;
    }

    const [fileContent, setFileContent] = React.useState([]);

    React.useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            try {
                const funcionesDocumentadas = JSON.parse(procesarArchivosJs(content));
                setFileContent(funcionesDocumentadas);
            } catch (error) {
                console.error('Error al procesar el archivo:', error);
                setFileContent([]);
            }
        };
        reader.readAsText(file);

        return () => {
            reader.abort();
        };
    }, [file]);

    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16 bg-gray-800'>
                <h1 className='text-white text-3xl mb-8'>Contenido de {file.name}</h1>
                <Link
                    to="/result"
                    state={{ uploadedFiles }}
                    className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                >
                    Volver a la lista de archivos
                </Link>

                <div className="mt-6 space-y-4">
                    {fileContent.length > 0 ? (
                        fileContent.map((func, index) => (
                            <div key={index} className="p-4 bg-gray-700 rounded-lg">
                                <h2 className="text-xl text-blue-300">{func.name}</h2>
                                <p className="text-white">{func.documentation.description}</p>
                                <h3 className="text-lg text-blue-200">Parámetros:</h3>
                                <ul className="list-disc list-inside mb-4">
                                    {func.documentation.params.map((param, paramIndex) => (
                                        <li key={paramIndex} className="text-white">
                                            <strong>{param.name}</strong> ({param.type}): {param.description}
                                        </li>
                                    ))}
                                </ul>
                                <h3 className="text-lg text-blue-200">Retorna:</h3>
                                <p className="text-white">
                                    <strong>{func.documentation.returns.type}</strong>: {func.documentation.returns.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No se encontraron funciones documentadas.</p>
                    )}
                </div>
            </main>
        </>
    );
}

export default FileContent;
