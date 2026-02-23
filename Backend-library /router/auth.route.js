
import routes from "express";
import loginController from "../controllers/auth.controller.js";

const route = routes()

route.post('/', loginController.login )

export default route;
