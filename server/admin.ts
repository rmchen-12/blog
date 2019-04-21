import express from "express";
import * as userController from "./controllers/user";

const router = express.Router();

router.post("/login", userController.postLogin);

router.post("/signUp", userController.postSignUp);

export default router;
