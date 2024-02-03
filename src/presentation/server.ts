import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    //inicialmente esta en http1 en produccion se sube a http2
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        // * Middlewares: Funciones que se ejecutan en todo momento que pase por un ruta
        /* son utilizados principalmente con frameworks web como Express.js,
        para construir una serie de funciones que se ejecutan en orden 
        durante el procesamiento de una solicitud */

        this.app.use(express.json()); //raw
        this.app.use(express.urlencoded({ extended: true })); //x-wwww-from-urlencoded

        //* Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes

        this.app.use(this.routes);

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} and public path /${this.publicPath}`);
        })
    }
}