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
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f0f4f8;
                        color: #333;
                        margin: 20px;
                    }
                    h1 {
                        text-align: center;
                        color: #4a90e2;
                    }
                    .file-section {
                        margin-bottom: 30px;
                        padding: 20px;
                        border: 1px solid #e1e1e1;
                        border-radius: 8px;
                        background-color: #fff;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        margin: 0 0 10px;
                        color: #4a90e2;
                        border-bottom: 2px solid #4a90e2;
                        padding-bottom: 5px;
                    }
                    ul {
                        list-style-type: none;
                        padding-left: 0;
                    }
                    li {
                        margin-bottom: 15px;
                        padding: 15px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                        transition: background-color 0.3s;
                    }
                    li:hover {
                        background-color: #e1f5fe;
                    }
                    strong {
                        display: block;
                        margin-bottom: 5px;
                        color: #333;
                    }
                    p {
                        margin: 5px 0;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <h1>Funciones Guardadas</h1>
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

    return (
        <div>
            <h1>Funciones Guardadas</h1>
            <button onClick={handleDownload}>Descargar Página</button>
            <div id="resultado">
                {Object.keys(funcionesPorArchivo).length > 0 ? (
                    Object.keys(funcionesPorArchivo).map(file => (
                        <div key={file} className="file-section">
                            <h2>{file}</h2>
                            <ul>
                                {funcionesPorArchivo[file].map((funcion, index) => (
                                    <li key={index}>
                                        <strong>{funcion.name}</strong>
                                        <p><strong>Description:</strong> {funcion.documentation.description}</p>
                                        <p><strong>Parameters:</strong> {funcion.documentation.params.length > 0 ? (
                                            funcion.documentation.params.map(param => (
                                                <span key={param.name}>
                                                    <br />- {param.name} ({param.type}): {param.description}
                                                </span>
                                            ))
                                        ) : 'Ninguno'}</p>
                                        <p><strong>Returns:</strong> {funcion.documentation.returns ? (
                                            `${funcion.documentation.returns.type}: ${funcion.documentation.returns.description}`
                                        ) : 'Ninguno'}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No hay funciones guardadas en la sesión.</p>
                )}
            </div>
        </div>
    );
}

export default Result;
