import express from "express";
import * as userController from "./controllers/user";
import * as tagController from "./controllers/tag";
import * as articleController from "./controllers/article";

const router = express.Router();

router.post("/login", userController.postLogin);
router.post("/signUp", userController.postSignUp);

router.get("/getTags", tagController.getTags);
router.post("/createTag", tagController.createTag);
router.post("/deleteTag", tagController.deleteTag);

router.post("/addArticle", articleController.addArticle);
router.post("/updateArticle", articleController.updateArticle);
router.post("/deleteArticle", articleController.deleteArticle);
router.post("/postArticles", articleController.postArticles);
router.post("/getArticle", articleController.getArticle);

export default router;
