import { procesarArchivosJs } from '@utils/language/javascript'
import { procesarArchivosPy } from '@utils/language/python'
import { procesarArchivosPhp } from '@utils/language/php'

function procesarLenguajeAEjecutar(lenguaje, fileContent) {
    const mapaDeEjecucion = {
        js: procesarArchivosJs,
        py: procesarArchivosPy,
        php: procesarArchivosPhp
    };

    return mapaDeEjecucion[lenguaje](fileContent);
}

export { procesarLenguajeAEjecutar };