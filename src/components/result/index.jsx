import React, { useEffect, useState } from 'react';

function Result() {
    const [funcionesPorArchivo, setFuncionesPorArchivo] = useState({});

    useEffect(() => {
        const funcionesJSON = sessionStorage.getItem('funciones');

        if (funcionesJSON) {
            const funcionesRecuperadas = JSON.parse(funcionesJSON);
            const agrupadas = {};

            // Agrupar funciones por archivo
            funcionesRecuperadas.forEach(funcion => {
                const file = funcion.file;
                if (!agrupadas[file]) {
                    agrupadas[file] = [];
                }
                agrupadas[file].push(funcion);
            });

            setFuncionesPorArchivo(agrupadas);
        }
    }, []);

    const handleDownload = () => {
        const resultadoHTML = document.getElementById('resultado').innerHTML;

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Funciones Guardadas</title>
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <link href="https://cdn.jsdelivr.net/npm/daisyui@1.14.0/dist/full.css" rel="stylesheet">
            </head>
            <body class="bg-base-200 text-base-content p-6">
                <h1 class="text-3xl text-center text-primary mb-8">Funciones Guardadas</h1>
                <div id="resultado">
                    ${resultadoHTML}
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'funciones_guardadas.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderFunciones = () => {
        if (Object.keys(funcionesPorArchivo).length === 0) {
            return <p>Hubo un error al tomar el archivo. Disculpe las molestias.</p>;
        }

        return Object.keys(funcionesPorArchivo).map(file => (
            <div key={file} className="file-section mb-6 p-4 border rounded-lg shadow-md">
                <h2 className="text-2xl text-primary mb-4">{file}</h2>
                <ul className="list-none">
                    {funcionesPorArchivo[file].map((funcion, index) => (
                        <li key={index} className="mb-4 p-4 rounded-lg shadow-sm ">
                            <strong className="block text-lg">{funcion.name}</strong>
                            <p><strong>Description:</strong> {funcion.documentation.description}</p>
                            <p>
                                <strong>Parameters:</strong> {funcion.documentation.params.length > 0 ? (
                                    funcion.documentation.params.map(param => (
                                        <span key={param.name} className="block">
                                            - {param.name} ({param.type}): {param.description}
                                        </span>
                                    ))
                                ) : 'Ninguno'}
                            </p>
                            <p>
                                <strong>Returns:</strong> {funcion.documentation.returns ? (
                                    `${funcion.documentation.returns.type}: ${funcion.documentation.returns.description}`
                                ) : 'void'}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <>
            <h1 className="text-3xl text-center text-primary mb-8">Funciones Guardadas</h1>
            <button className="btn btn-primary mb-6" onClick={handleDownload}>Descargar Página</button>
            <div id="resultado">
                {renderFunciones()}
            </div>
        </>
    );
}

export default Result;
