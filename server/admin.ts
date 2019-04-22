import express from "express";
import * as userController from "./controllers/user";
import * as articleController from "./controllers/article";

const router = express.Router();

router.post("/login", userController.postLogin);

router.post("/signUp", userController.postSignUp);

router.post("/addArticle", articleController.addArticle);

export default router;
