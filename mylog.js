
/*cada vez que se quiera revisar un cambio nuevo, guardar, en la consola cerrar el servidor ctrl+c y correr de nuevo el archivo con node. Actualizar la página en el buscador y aparecerán las nuevas actualizaciones*/

//LOCAL MODULES NODEJS 

function info(txt) {
    console.log('Info: ', txt);
    return txt;
};

function error(txt) {
    console.log('Error: ', txt);
    return txt;
};

// para exportar y utilizar en cualquier otro archivo estas funciones se utiliza module.exports

module.exports = {info, error};