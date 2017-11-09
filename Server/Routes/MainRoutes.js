import express from "express";
import userApi from "../Controllers/UserController";
import authServices from "../Services/AuthServices";
let userRouter = express.Router();

userRouter.use(authServices.isUserAuthenticated);

userRouter
  .get("/", userApi.home)
  .get("/users", userApi.getUsers)
  .put("/users", userApi.upgradeUser)
  .post("/users", userApi.addUser);

export default userRouter;
