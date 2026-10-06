import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controller/restaurant.controller";
import productController from "./controller/product.controller";

/** restaurant routes **/
routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin
  .get("/signup", restaurantController.getSignup)
  .post("/signup", restaurantController.processSignup);

routerAdmin.get("/logout", restaurantController.logout);

routerAdmin.get("/check-me", restaurantController.checkAuthSession);

/** product routes **/

routerAdmin.get(
  "/products/all",
  restaurantController.verifyRestaurant,
  productController.getAllProducts,
);
routerAdmin.post("/products/create", productController.createNewProduct);
routerAdmin.put("/products/:id", productController.updateChosenProduct);
/** user routes **/

export default routerAdmin;
