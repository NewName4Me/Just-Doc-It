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
        const { description, params, returns } = analizarDocumentacionPy(docString);

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
 * @returns {object} - Objeto con la descripción, parámetros y retorno de la función.
 */
const analizarDocumentacionPy = (docString) => {
    const lines = docString.split('\n').map(line => line.trim());
    let description = '';
    const params = [];
    let returns = '';

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\"\"\" ?/, '').trim();
        if (trimmedLine.startsWith('Parameters:') || trimmedLine.startsWith('Args:')) {
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

export { procesarArchivosPy }
