/**
 * Procesa el contenido de los archivos JavaScript dados, extrayendo las funciones
 * y devolviendo un JSON con los datos:
 * descripcion, nombre, parametros y returns
 * @param {string} content - contenido del archivo js
 * @returns {string} - JSON con info detallada de cada función
 */
const procesarArchivosJs = (content) => {
    // Array para almacenar los detalles de cada función
    const funcionesAgrupadas = [];

    // REGEX
    const regexDocString = /\/\*\*\s*([\s\S]*?)\s*\*\//; // bloque de documentación
    const regexFunctionName = /function\s+(\w+)\s*\(/; // nombre de la función
    const regex = new RegExp(`${regexDocString.source}\\s*${regexFunctionName.source}`, 'g');

    let match;

    // Iteramos sobre cada coincidencia de funciones dentro del contenido
    while ((match = regex.exec(content)) !== null) {
        // Bloque de documentación de la función
        const docString = match[1].trim();
        const functionName = match[2];
        // Extraigo los detalles importantes de mi función
        const { description, params, returns } = analizarDocumentacion(docString);

        // Creamos el objeto con los datos de la función
        funcionesAgrupadas.push({
            name: functionName,
            documentation: {
                description: description,
                params: params,
                returns: returns
            },
        });
    }

    return JSON.stringify(funcionesAgrupadas, null, 2);
}

/**
 * Analiza el bloque de documentación de una función, extrayendo los detalles de descripción,
 * parámetros y retorno.
 * @param {string} docString - Bloque de documentación de la función.
 * @returns {object} - Objeto con la descripción, parámetros y retorno de la función.
 */
const analizarDocumentacion = (docString) => {
    // Divide el bloque en diferentes líneas
    const lines = docString.split('\n').map(line => line.trim());

    let description = '';
    const params = [];
    let returns = '';

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\* ?/, '').trim(); // Quitar caracteres extra en las líneas

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
}


export { procesarArchivosJs }