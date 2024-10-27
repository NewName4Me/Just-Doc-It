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

export { procesarArchivosPhp }