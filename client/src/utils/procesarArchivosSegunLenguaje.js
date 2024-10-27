// Procesa archivos JavaScript extrayendo las funciones documentadas y genera un JSON con la información de cada función
/**
 * Procesa el contenido de archivos JavaScript, extrayendo las funciones documentadas y generando un JSON
 * que contiene información como nombre, descripción, parámetros y retorno de cada función.
 * @param {string} content - El contenido del archivo JavaScript como string.
 * @returns {string} - JSON con información detallada de cada función documentada.
 */
const procesarArchivosJs = (content) => {
    const funcionesAgrupadas = []; // Array para almacenar los detalles de cada función

    // Expresiones regulares para encontrar documentación y nombre de funciones en el contenido
    const regexDocString = /\/\*\*\s*([\s\S]*?)\s*\*\//; // Coincide con el bloque de documentación de la función
    const regexFunctionName = /function\s+(\w+)\s*\(/;   // Coincide con el nombre de la función
    const regex = new RegExp(`${regexDocString.source}\\s*${regexFunctionName.source}`, 'g'); // Une ambas expresiones para procesar el contenido completo

    let match;
    // Itera sobre cada coincidencia de función en el contenido
    while ((match = regex.exec(content)) !== null) {
        const docString = match[1].trim(); // Bloque de documentación de la función
        const functionName = match[2]; // Nombre de la función
        const { description, params, returns } = analizarDocumentacion(docString); // Extrae detalles del bloque de documentación

        // Añade la información de la función al array de funciones agrupadas
        funcionesAgrupadas.push({
            name: functionName,
            documentation: {
                description: description,
                params: params,
                returns: returns
            },
        });
    }

    return JSON.stringify(funcionesAgrupadas, null, 2); // Retorna el array en formato JSON
};

// Analiza y extrae la documentación de funciones en JavaScript.
/**
 * Analiza la documentación de una función en JavaScript, extrayendo descripción, parámetros y valor de retorno.
 * @param {string} docString - El bloque de documentación de la función.
 * @returns {object} - Objeto que contiene la descripción, parámetros y valor de retorno de la función.
 */
const analizarDocumentacion = (docString) => {
    const lines = docString.split('\n').map(line => line.trim()); // Divide el bloque en líneas
    let description = ''; // Descripción general de la función
    const params = []; // Array para almacenar parámetros
    let returns = ''; // Detalle del valor de retorno

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\* ?/, '').trim(); // Limpia caracteres extra en la línea

        if (trimmedLine.startsWith('@param')) { // Maneja la línea que describe parámetros
            const paramMatch = trimmedLine.match(/@param\s+{([^}]+)}\s+(\w+)\s+(.*)/);
            if (paramMatch) {
                params.push({
                    type: paramMatch[1].trim(),
                    name: paramMatch[2].trim(),
                    description: paramMatch[3] ? paramMatch[3].trim() : ''
                });
            }
        } else if (trimmedLine.startsWith('@returns')) { // Maneja la línea que describe el retorno
            const returnMatch = trimmedLine.match(/@returns\s+{([^}]+)}\s*(.*)/);
            if (returnMatch) {
                returns = {
                    type: returnMatch[1].trim(),
                    description: returnMatch[2].trim()
                };
            }
        } else {
            description += trimmedLine + ' '; // Concatenación de líneas que contienen descripción general
        }
    });

    description = description.trim();

    return { description, params, returns };
};

// Procesa archivos PHP para extraer funciones documentadas de manera similar a JavaScript
/**
 * Procesa el contenido de archivos PHP, extrayendo las funciones documentadas y generando un JSON
 * con nombre, descripción, parámetros y valor de retorno de cada función.
 * @param {string} content - El contenido del archivo PHP como string.
 * @returns {string} - JSON con información detallada de cada función documentada.
 */
const procesarArchivosPhp = (content) => {
    const funcionesAgrupadas = [];
    const regexDocString = /\/\*\*\s*([\s\S]*?)\s*\*\//; // Coincide con el bloque de documentación
    const regexFunctionNameParams = /function\s+(\w+)\s*\(([^)]*)\)\s*\{/; // Coincide con nombre y parámetros
    const regex = new RegExp(`${regexDocString.source}\\s*${regexFunctionNameParams.source}`, 'g');

    let match;
    while ((match = regex.exec(content)) !== null) {
        const docString = match[1].trim();
        const functionName = match[2];
        const paramsString = match[3];
        const { description, params, returns } = analizarDocumentacionPhp(docString, paramsString);

        funcionesAgrupadas.push({
            name: functionName,
            documentation: {
                description,
                params,
                returns
            },
        });
    }

    return JSON.stringify(funcionesAgrupadas, null, 2);
};

// Analiza la documentación de funciones PHP y extrae parámetros y retorno.
/**
 * Analiza la documentación de una función en PHP, extrayendo la descripción, parámetros y valor de retorno.
 * @param {string} docString - Bloque de documentación de la función.
 * @param {string} paramsString - Lista de parámetros de la función.
 * @returns {object} - Objeto con la descripción, parámetros y retorno de la función.
 */
const analizarDocumentacionPhp = (docString, paramsString) => {
    const lines = docString.split('\n').map(line => line.trim());
    let description = '';
    const params = [];
    let returns = '';

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\* ?/, '').trim();
        if (trimmedLine.startsWith('@param')) {
            const paramMatch = trimmedLine.match(/@param\s+(\w+)\s+\$(\w+)\s*(.*)/);
            if (paramMatch) {
                params.push({
                    type: paramMatch[1].trim(),
                    name: paramMatch[2].trim(),
                    description: paramMatch[3] ? paramMatch[3].trim() : ''
                });
            }
        } else if (trimmedLine.startsWith('@return')) {
            const returnMatch = trimmedLine.match(/@return\s+(\w+)\s*(.*)/);
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

    return { description, params, returns };
};

// Procesa archivos Python, extrayendo funciones documentadas de manera similar.
/**
 * Procesa el contenido de archivos Python, extrayendo las funciones documentadas y generando un JSON
 * que contiene nombre, descripción, parámetros y valor de retorno de cada función.
 * @param {string} content - El contenido del archivo Python como string.
 * @returns {string} - JSON con información detallada de cada función documentada.
 */
const procesarArchivosPy = (content) => {
    const funcionesAgrupadas = [];
    const regexFunctionDoc = /def\s+(\w+)\s*\(([^)]*)\):\s*\"\"\"([\s\S]*?)\"\"\"/g;

    let match;
    while ((match = regexFunctionDoc.exec(content)) !== null) {
        const functionName = match[1];
        const paramsString = match[2];
        const docString = match[3].trim();
        const { description, params, returns } = analizarDocumentacionPy(docString, paramsString);

        funcionesAgrupadas.push({
            name: functionName,
            documentation: {
                description,
                params,
                returns
            },
        });
    }

    return JSON.stringify(funcionesAgrupadas, null, 2);
};

// Analiza la documentación de funciones en Python.
/**
 * Analiza el bloque de documentación de una función en Python, separando descripción, parámetros y valor de retorno.
 * @param {string} docString - Bloque de documentación de la función.
 * @param {string} paramsString - Lista de parámetros de la función.
 * @returns {object} - Objeto con la descripción, parámetros y retorno de la función.
 */
const analizarDocumentacionPy = (docString, paramsString) => {
    const lines = docString.split('\n').map(line => line.trim());
    let description = '';
    const params = [];
    let returns = '';

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\"\"\" ?/, '').trim();
        if (trimmedLine.startsWith('Parameters:')) {
            const paramLines = lines.slice(lines.indexOf(line) + 1);
            paramLines.forEach(paramLine => {
                const paramMatch = paramLine.match(/(\w+)\s+\(([^)]+)\):\s*(.*)/);
                if (paramMatch) {
                    params.push({
                        type: paramMatch[2].trim(),
                        name: paramMatch[1].trim(),
                        description: paramMatch[3] ? paramMatch[3].trim() : ''
                    });
                }
            });
        } else if (trimmedLine.startsWith('Returns:')) {
            const returnLine = lines[lines.indexOf(line) + 1];
            const returnMatch = returnLine.match(/(\w+):\s*(.*)/);
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

    return { description, params, returns };
};

// Exporta las funciones de procesamiento
export { procesarArchivosJs, procesarArchivosPhp, procesarArchivosPy };
