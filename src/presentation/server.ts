import express from 'express'
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    //inicialmente esta en http1 en produccion se sube a http2
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path ='public'} = options;  
        this.port = port;
        this.publicPath = public_path;
    }

    async start() {

        // * Middlewares: Funciones que se ejecutan en todo momento que pase por un ruta
        /* son utilizados principalmente con frameworks web como Express.js,
        para construir una serie de funciones que se ejecutan en orden 
        durante el procesamiento de una solicitud */

        //* Public folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
        })
        this.app.listen(3000, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}