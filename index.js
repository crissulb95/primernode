
/*cada vez que se quiera revisar un cambio nuevo, guardar, en la consola cerrar el servidor ctrl+c y correr de nuevo el archivo con node. Actualizar la página en el buscador y aparecerán las nuevas actualizaciones*/

//CORE MODULES NODEJS (http)

//para importar módulos locales se llama a una función require igualmente
const mylog = require('./mylog.js');
const http = require('http');
//para importar modulos de paquetes instalados con npm
//entre llaves se llama lo que querramos importar, y como argumento en require, colocamos el nombre del modulo 
const {countries} = require('countries-list');
//si se quiere ir a la información directamente desde el URL, se importa el modulo url
const url = require('url');
const queryString = require('querystring');


const server = http.createServer((request,response) => {//arg1 = petición que se hace al servidor con x información
    //arg 2 es la respuesta que envía el servidor 

        let parsed = url.parse(request.url);

        console.log(parsed); //desde acá podemos extraer el query de la url, para asi poder identificar qué se está escribiendo en esa parte de la url y poder manipularlo
        let pathName = parsed.pathname;

        let someQuery = queryString.parse(parsed.query);
        console.log(someQuery.code); //se extrae qué codigo posee el query de la url que estemos seleccionando
        
     if(pathName === '/'){ //en request.url, según el tipo de url que se indique, se responderá de la forma que corresponda
        response.writeHead(200,{'Content-Type': 'text/html'}); // como respuesta se le envía un html, y el status 200 indica que es correcta la petición.
        response.write('<html><body><h1>Página inicial HOME</h1></body></html>'); //con la función write como respuesta, se procede a escribir el html interno que se envió previamente 
        response.end(); //se confirma el envío de la respuesta al cliente
    } else if(pathName === '/gracias'){ 
        response.writeHead(200,{'Content-Type': 'text/html'}); 
        response.write('<html><body><h1>Le agradecemos por formar parte de localhost:4000</h1></body></html>');
        response.end();
    } else if(pathName === '/info'){ 
        let resultInfo = mylog.info(pathName);//se manejan como objetos, por lo que se escribe como objeto.propiedad para obtener el resultado, si es una función se agregan los parentesis más los argumentos
        response.writeHead(200,{'Content-Type': 'text/html'}); 
        response.write(resultInfo);
        response.end();
    } else if(pathName === '/country'){ 
        response.writeHead(200,{'Content-Type': 'application/json'}); //se cambia el tipo de archivo que se le pasa por un formato JSON
        response.write(JSON.stringify(countries[someQuery.code]));//al ser un JSON se trata como tal y para que devuelva un string, utilizamos la funcion stringify, ingresandole los datos correctos que necesitemos
        response.end();
    } else if(pathName === '/error'){ 
        let resultError = mylog.error(pathName);
        response.writeHead(200,{'Content-Type': 'text/html'}); 
        response.write(resultError);
        response.end();
    } else {
        response.writeHead(404,{'Content-Type': 'text/html'}); //se indica el codigo 404, cuando no se encuentra lo que busca por el url
        response.write('<html><body><h1>No se encuentra lo que busca</h1></body></html>');
        response.end();
    } 
});

server.listen(4000); //listen para que ejecute la aplicación en el puerto que se le indique, en este caso el puerto 4000

console.log('Corriendo en el puerto 4000...');