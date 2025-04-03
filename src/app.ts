import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/app-routes";
import { AppServer } from "./presentation/app-server";

( async() => {
  App();
} )();


function App() {

  const server = new AppServer(envs.PORT, AppRoutes.routes);
  server.start();
  
}