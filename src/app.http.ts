import fs from 'fs';
import http from 'http';


const server = http.createServer((req, res) => {
    console.log(req.url);
    //prueba de respues de una solucitud
    // res.write('Hola Mundo');
    // res.end();

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // * Server Side Rendering example
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();
    // * Retorno de Json
    // const data= {name:'John Doe', age:30, city:'New York'};
    // res.writeHead(200, {'Content-Type': 'application/json'});
    // res.end(JSON.stringify(data));
    // * Web Server(Read files) No Services Rest

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }
// Express , fastify, nest.js
    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
    res.end(responseContent);
})


server.listen(8080, () => {
    console.log('Server running on port 8080');
});