// Procesa archivos PHP para extraer funciones documentadas
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

        const { description, params, returns } = analizarDocumentacionPhp(docString, paramsString, returnType);

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
const analizarDocumentacionPhp = (docString, paramsString, returnType) => {
    const lines = docString.split('\n').map(line => line.trim());
    let description = '';
    const params = [];
    let returns = { type: returnType, description: '' };

    lines.forEach(line => {
        const trimmedLine = line.replace(/^\* ?/, '').trim();
        if (trimmedLine.startsWith('@param')) {
            const paramMatch = trimmedLine.match(/@param\s+(\w+)?\s*(\$?\w+)?\s*(.*)/);
            if (paramMatch) {
                params.push({
                    type: paramMatch[1] ? paramMatch[1].trim() : '',
                    name: paramMatch[2] ? paramMatch[2].trim() : '',
                    description: paramMatch[3] ? paramMatch[3].trim() : ''
                });
            }
        } else if (trimmedLine.startsWith('@return')) {
            const returnMatch = trimmedLine.match(/@return\s+(\w+)?\s*(.*)/);
            if (returnMatch) {
                returns = {
                    type: returnType || (returnMatch[1] ? returnMatch[1].trim() : ''),
                    description: returnMatch[2] ? returnMatch[2].trim() : ''
                };
            }
        } else {
            description += trimmedLine + ' ';
        }
    });

    description = description.trim() || 'Undocumented function'; // Asegura que haya una descripción
    return { description, params, returns };
};

export { procesarArchivosPhp };
