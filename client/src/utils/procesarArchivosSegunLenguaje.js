const procesarArchivosJs = (content) => {
    const funcionesAgrupadas = [];
    const regex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*function\s+(\w+)\s*\(/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const docString = match[1].trim();
        const functionName = match[2];
        const { description, params, returns } = analizarDocumentacion(docString);

        funcionesAgrupadas.push({
            name: functionName,
            documentation: {
                description: description,
                params: params,
                returns: returns
            },
        });
    }

    return JSON.stringify(funcionesAgrupadas, null, 2); // Retorna las funciones en formato JSON
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

const procesarArchivosPhp = (content) => {
    const funcionesAgrupadas = [];
    const regex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*function\s+(\w+)\s*\(([^)]*)\)\s*\{/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const docString = match[1].trim();
        const functionName = match[2];
        const paramsString = match[3];
        const { description, params, returns } = analizarDocumentacionPhp(docString, paramsString);

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
};

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

    return {
        description: description,
        params: params,
        returns: returns
    };
};

const procesarArchivosPy = (content) => {
    const funcionesAgrupadas = [];
    const regex = /def\s+(\w+)\s*\(([^)]*)\):\s*\"\"\"([\s\S]*?)\"\"\"/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const functionName = match[1];
        const paramsString = match[2];
        const docString = match[3].trim();
        const { description, params, returns } = analizarDocumentacionPy(docString, paramsString);

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
};

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

    return {
        description: description,
        params: params,
        returns: returns
    };
};

export { procesarArchivosJs, procesarArchivosPhp, procesarArchivosPy };

