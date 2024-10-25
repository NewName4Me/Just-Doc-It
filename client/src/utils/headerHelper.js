
/**
 * Funcion que evita el comportamiento por defecto de los enlaces 
 * que tienen la clase 'cursor-not-allowed' para que asi no vaya el usuario a paginas aun no desarrolladas
 * @function stopLinkUsage
 */
function stopLinkUsage() {
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const clases = e.target.className;
            if (clases.includes('cursor-not-allowed')) {
                e.preventDefault();
            }
        });
    });
}

export { stopLinkUsage };