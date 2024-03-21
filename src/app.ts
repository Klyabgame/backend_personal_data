import { envs } from "./data";
import { MainRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async()=>{
    main();
})();


async function main (){

    const server=new Server({
        port:envs.PORT,
        routes:MainRoutes.routes,
    });

    server.start();
}