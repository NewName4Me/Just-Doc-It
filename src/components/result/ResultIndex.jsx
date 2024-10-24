import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import JSZip from 'jszip';
import FileSaver from 'file-saver'; // Instala file-saver si no lo has hecho
import Header from '@components/header/HeaderIndex';
import { procesarArchivosJs, procesarArchivosPhp, procesarArchivosPy } from '@utils/procesarArchivosSegunLenguaje';

function ResultIndex() {
    const location = useLocation();
    const { uploadedFiles, language } = location.state || {};

    const languageExtension = {
        js: '.js',
        php: '.php',
        py: '.py',
    }[language] || '';

    const filteredFiles = uploadedFiles?.filter(file =>
        file.name.endsWith(languageExtension)
    );

    const handleDownload = async () => {
        const zip = new JSZip();
        const folder = zip.folder("archivos");

        // Crear HTML para la página actual como index.html con estilos
        const currentPageContent = `
            <html>
            <head>
                <title>Archivos para ${language.toUpperCase()}</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #282c34; color: white; }
                    h1 { color: #61dafb; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin: 10px 0; display: flex; align-items: center; }
                    a { color: #61dafb; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    .green-circle { width: 10px; height: 10px; background-color: #28a745; border-radius: 50%; margin-right: 10px; }
                    .left-bar { border-left: 4px solid #ffc107; padding-left: 10px; }
                </style>
            </head>
            <body>
                <h1>Archivos para ${language.toUpperCase()}</h1>
                <ul class="left-bar">
                    ${filteredFiles.map(file => `
                        <li>
                            <div class="green-circle"></div>
                            <a href="${file.name}.html">${file.name} (${file.webkitRelativePath})</a>
                        </li>
                    `).join('')}
                </ul>
            </body>
            </html>
        `;

        // Añadir la página actual al ZIP como index.html
        folder.file("index.html", currentPageContent);

        // Añadir cada archivo enlazado al ZIP
        for (const file of filteredFiles) {
            const fileContent = await readFileContent(file);
            let funcionesDocumentadas;
            if (language === 'js') {
                funcionesDocumentadas = JSON.parse(procesarArchivosJs(fileContent)); // Procesar el contenido
            } else if (language === 'php') {
                funcionesDocumentadas = JSON.parse(procesarArchivosPhp(fileContent)); // Procesar el contenido
            } else if (language === 'py') {
                funcionesDocumentadas = JSON.parse(procesarArchivosPy(fileContent)); // Procesar el contenido
            }

            // Crear el contenido HTML para cada archivo procesado
            const fileHtmlContent = `
                <html>
                <head>
                    <title>${file.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; background-color: #282c34; color: white; }
                        h1 { color: #61dafb; }
                        .back-button { margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
                        .back-button:hover { background-color: #0056b3; }
                        .func { background: #3c3f41; border-radius: 5px; margin: 10px 0; padding: 10px; }
                        .param { color: #61dafb; }
                        .returns { color: #98c379; }
                        ul { list-style-type: none; padding: 0; }
                        li { margin: 10px 0; display: flex; align-items: center; }
                        .green-circle { width: 10px; height: 10px; background-color: #28a745; border-radius: 50%; margin-right: 10px; }
                    </style>
                </head>
                <body>
                    <h1>Contenido de ${file.name}</h1>
                    <a href="index.html" class="back-button">Volver a la lista</a>
                    <div>
                        ${funcionesDocumentadas.map(func => `
                            <div class="func">
                                <h2>${func.name}</h2>
                                <p>${func.documentation.description}</p>
                                <h3>Parámetros:</h3>
                                <ul>
                                    ${func.documentation.params.map(param => `
                                        <li class="param"><strong>${param.name}</strong> (${param.type}): ${param.description}</li>
                                    `).join('')}
                                </ul>
                                <h3>Retorna:</h3>
                                <p class="returns"><strong>${func.documentation.returns.type}</strong>: ${func.documentation.returns.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </body>
                </html>
            `;
            folder.file(`${file.name}.html`, fileHtmlContent);
        }

        // Generar el ZIP
        const content = await zip.generateAsync({ type: "blob" });
        FileSaver.saveAs(content, "archivos.zip"); // Descargar el ZIP
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.onerror = (e) => {
                reject(new Error('Error al leer el archivo'));
            };
            reader.readAsText(file);
        });
    };

    return (
        <>
            <Header />
            <main className='h-screen pt-20 pl-16'>
                <h1 className='text-white text-3xl mb-8'>{language.toUpperCase()} Files</h1>
                <button
                    onClick={handleDownload}
                    className="mt-4 inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
                >
                    Descargar Página y Archivos
                </button>
                <section className='ml-14 border-l-4 border-warning'>
                    {filteredFiles && filteredFiles.length > 0 ? (
                        <ul className='left-bar'>
                            {filteredFiles.map((file, index) => {
                                const uniqueId = `${index}-${file.name}`;
                                const filePath = file.webkitRelativePath || file.name; // Suponiendo que la ruta está disponible
                                const trimmedPath = filePath.split('/').slice(1).join('/'); // Eliminar todo lo que está antes del primer "/"
                                return (
                                    <li key={uniqueId} className='text-white flex items-center '>
                                        <div className='w-5 h-5 bg-success rounded-full mr-4'></div>
                                        <Link
                                            to={`/result/${uniqueId}`}
                                            state={{ uploadedFiles, language }}
                                            className='text-white hover:underline hover:text-accent text-lg'
                                        >
                                            {file.name}
                                        </Link>
                                        <span className='ml-2 text-gray-400'>({trimmedPath})</span> {/* Mostrar la ruta recortada */}
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


