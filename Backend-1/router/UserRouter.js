const express = require("express");

const {
  RegisterUser,
  LoginUser,
  UpdateUser,
  getUser,
  getAllUser,
} = require("../controller/UserControler");

const userRouter = express.Router();

userRouter.post("/registers", RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.get("/getUser/:id", getUser);
// userRouter.get('/getAllUser' ,getAllUser )
userRouter.patch("/updateUser/:id", UpdateUser);

module.exports = { userRouter };
