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

const procesarArchivosPhp = (file) => {
    console.log('hola php');
};

const procesarArchivosPy = (file) => {
    console.log('hola py');
};

export { procesarArchivosJs, procesarArchivosPhp, procesarArchivosPy };
