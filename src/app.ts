import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async()=> {
    main();
})()


function main() {
    console.log('Main');
    const server= new Server({
        port: envs.PORT,
        public_path:envs.PUBLIC_PATH,
        routes:AppRoutes.routes,
    }); 
    server.start()
}