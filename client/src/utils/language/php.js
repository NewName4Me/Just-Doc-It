// Procesa archivos PHP para extraer funciones documentadas
/**
 * Analiza el contenido de un archivo PHP y devuelve un JSON con
 * la información de las funciones documentadas.
 * @param {string} content - Contenido del archivo PHP.
 * @returns {string} - JSON con la información de las funciones documentadas.
 */
const procesarArchivosPhp = (content) => {
    const funcionesAgrupadas = [];
    const regexDocString = /\/\*\*\s*([\s\S]*?)\s*\*\//; // Bloque de documentación
    const regexFunctionNameParams = /function\s+(\w+)\s*\(([^)]*)\)\s*(?::\s*(\w+))?\s*\{/; // Nombre, parámetros y tipo de retorno (opcional)
    const regex = new RegExp(`${regexDocString.source}\\s*${regexFunctionNameParams.source}`, 'g');

    let match;
    while ((match = regex.exec(content)) !== null) {
        const docString = match[1].trim();
        const functionName = match[2];
        const paramsString = match[3];
        const returnType = match[4] || ''; // Maneja el caso en que no se especifique el tipo de retorno

        // Analiza la documentación de la función actual
        const { description, params, returns } = analizarDocumentacionPhp(docString, paramsString, returnType);

        // Agrega la función actual a la lista de funciones documentadas
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
 * Analiza la documentación de una función PHP y extrae la descripción, parámetros y tipo de retorno.
 * @param {string} docString - Bloque de documentación de la función.
 * @param {string} paramsString - Parámetros de la función.
 * @param {string} returnType - Tipo de retorno de la función (opcional).
 * @returns {object} - Objeto con la descripción, parámetros y tipo de retorno de la función.
 */
const analizarDocumentacionPhp = (docString, paramsString, returnType) => {
    const lines = docString.split('\n').map(line => line.trim());
    let description = '';
    const params = [];
    let returns = { type: returnType, description: '' };

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\* ?/, '').trim();
        if (trimmedLine.startsWith('@param')) {
            // Extrae la información de los parámetros
            const paramMatch = trimmedLine.match(/@param\s+(\w+)?\s*(\$?\w+)?\s*(.*)/);
            if (paramMatch) {
                params.push({
                    type: paramMatch[1] ? paramMatch[1].trim() : '',
                    name: paramMatch[2] ? paramMatch[2].trim() : '',
                    description: paramMatch[3] ? paramMatch[3].trim() : ''
                });
            }
        } else if (trimmedLine.startsWith('@return')) {
            // Extrae la información del tipo de retorno
            const returnMatch = trimmedLine.match(/@return\s+(\w+)?\s*(.*)/);
            if (returnMatch) {
                returns = {
                    type: returnType || (returnMatch[1] ? returnMatch[1].trim() : ''),
                    description: returnMatch[2] ? returnMatch[2].trim() : ''
                };
            }
        } else {
            // Concatena las líneas de la descripción
            description += trimmedLine + ' ';
        }
    });

    description = description.trim() || 'Undocumented function'; // Asegura que haya una descripción
    return { description, params, returns };
};

export { procesarArchivosPhp };

