import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";

/** restaurant routes **/
routerAdmin.get("/", restaurantController.goHome);

routerAdmin     
.get("/login", restaurantController.getLogin)
.post("/login", restaurantController.processLogin);

routerAdmin  
.get("/signup", restaurantController.getSignup)
.post("/signup", restaurantController.processSignup);

routerAdmin
.get("/logout", restaurantController.logout);

routerAdmin
.get("/check-me", restaurantController.checkAuthSession);
/** product routes **/
/** user routes **/

export default routerAdmin;