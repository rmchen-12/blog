import express from "express";
import * as userController from "./controllers/user";
import * as tagController from "./controllers/tag";

const router = express.Router();

router.post("/login", userController.postLogin);

router.post("/signUp", userController.postSignUp);

router.get("/getTags", tagController.getTags);

router.post("/createTag", tagController.createTag);

export default router;
