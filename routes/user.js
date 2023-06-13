// ---> Route Splitting-MVC <---
import express from "express";
import { getMyProfile, login, logout ,  register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new" , register);
router.post("/login" , login);
router.get("/logout" , logout);

// userid/vdvdv == userid/dvdjsv
router.get("/me" , isAuthenticated , getMyProfile);


// ----> OR <---- 

// router.route("/userid/:id")
// .get(getuserDetails)
// .put(UpdateUser)
// .delete(DeleteUser)

export default router;