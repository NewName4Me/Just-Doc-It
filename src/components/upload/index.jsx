import React, { useEffect } from 'react';

function Index() {
    useEffect(() => {
        iniciarApp();
    }, []);

    const iniciarApp = () => {
        tomarFormulario();
    };

    const tomarFormulario = () => {
        const form = document.querySelector('#uploadForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            procesarArchivos(form);
        });
    };

    const procesarArchivos = (form) => {
        const formData = new FormData(form);
        const files = formData.getAll('file');
        const funcionesAgrupadas = []; // Array para almacenar todas las funciones de todos los archivos
        let archivosLeidos = 0; // Contador de archivos leídos

        if (files.length > 0) {
            files.forEach((file) => {
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.js')) {
                    leerArchivoJavascript(file, funcionesAgrupadas, () => {
                        archivosLeidos++; // Incrementa el contador cuando se lee un archivo
                        if (archivosLeidos === files.length) {
                            console.log('Todos los archivos han sido leídos');
                            mostrarResultadoDocTodasLasFunciones(funcionesAgrupadas); // Llama a la función Erik
                        }
                    });
                }
            });
        } else {
            console.log('No se seleccionaron archivos');
        }
    };

    const leerArchivoJavascript = (file, funcionesAgrupadas, onComplete) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const contenido = e.target.result;
            procesarContenidoJS(file.name, contenido, funcionesAgrupadas);
            onComplete(); // Llama a la función cuando termina de leer el archivo
        };

        reader.onerror = () => {
            console.log('Error al leer ' + file.name);
        };

        reader.readAsText(file);
    };

    const procesarContenidoJS = (fileName, content, funcionesAgrupadas) => {
        const funcionesDelArchivo = extraerFuncionDelArchivoConDoc(content, fileName);
        funcionesAgrupadas.push(...funcionesDelArchivo);
        console.log(funcionesAgrupadas); // Muestra todas las funciones agrupadas
    };

    const extraerFuncionDelArchivoConDoc = (content, fileName) => {
        const funcionesConDoc = [];
        const regex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*function\s+(\w+)\s*\(/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            const docString = match[1].trim();
            const functionName = match[2];
            const { description, params, returns } = analizarDocumentacion(docString);
            funcionesConDoc.push({
                name: functionName,
                documentation: {
                    description: description,
                    params: params,
                    returns: returns
                },
                file: fileName
            });
        }
        return funcionesConDoc;
    };

    const analizarDocumentacion = (docString) => {
        const lines = docString.split('\n').map(line => line.trim());
        let description = '';
        const params = [];
        let returns = '';

        lines.forEach(line => {
            const trimmedLine = line.replace(/^\* ?/, '').trim();
            if (trimmedLine.startsWith('@param')) {
                const paramMatch = trimmedLine.match(/@param\s+{([^}]+)}\s+(\w+)\s+(.*)/);
                if (paramMatch) {
                    params.push({
                        type: paramMatch[1].trim(),
                        name: paramMatch[2].trim(),
                        description: paramMatch[3] ? paramMatch[3].trim() : ''
                    });
                }
            } else if (trimmedLine.startsWith('@returns')) {
                const returnMatch = trimmedLine.match(/@returns\s+{([^}]+)}\s*(.*)/);
                if (returnMatch) {
                    returns = {
                        type: returnMatch[1].trim(),
                        description: returnMatch[2].trim()
                    };
                }
            } else {
                description += trimmedLine + ' ';
            }
        });

        description = description.trim();

        return {
            description: description,
            params: params,
            returns: returns
        };
    };

    const mostrarResultadoDocTodasLasFunciones = (funciones) => {
        const funcionesJSON = JSON.stringify(funciones);

        // Guardar el objeto en sessionStorage
        sessionStorage.setItem('funciones', funcionesJSON);

        // Redirigir a otra página
        window.location.href = '/result';
    };

    return (
        <>
            <h1>Upload</h1>
            <form
                id="uploadForm"
                action="#"
                method="POST"
                encType="multipart/form-data"
            >
                <input type="file" id="file" name="file" multiple webkitdirectory="true" />
                <input type="submit" value="Upload" />
            </form>
        </>
    );
}

export default Index;
