const { UserModel } = require("../model/UserSchema");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkUserExits = await UserModel.findOne({ username: username });
    if (checkUserExits) {
      res.send("user da ton tai");
      next();
    } else {
      const salt = bcrypt.genSaltSync(9);
      const hassPassword = bcrypt.hashSync(password, salt);
      const user = await UserModel.create({
        username: username,
        password: hassPassword,
      });
      res.send("create success");
      next();
    }
  } catch (error) {
    res.send(error);
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const checkUserExits = await UserModel.findOne({ username: username });
    console.log(checkUserExits);
    const checkPassword = bcrypt.compareSync(password, checkUserExits.password);
    if (checkUserExits && checkPassword) {
      const token = jwt.sign(
        {
          username: username,
          Role: checkUserExits.Role,
          id: checkUserExits.id,
        },
        "long123"
      );
      res.send({ token: token });
      
    } else {
      res.send("user k ton tai & wrong password");
      next()
    }
  } catch (error) {
    res.send(error);
  }
};

const UpdateUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(9);
    const hassPassword = bcrypt.hashSync(password, salt);
    const id = req.params.id;
    // console.log(id)
    const checkUser = await UserModel.findOne({ _id: id });
    // console.log(checkUser)

    if (checkUser) {
      const UpdateNewUser = await UserModel.findByIdAndUpdate(
        id,
        { username: username, password: password },
        { new: true }
      );
      console.log(UpdateNewUser);
      res.send(UpdateNewUser);
    } else {
      res.send("error");
    }
  } catch (error) {
    res.send(error);
  }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    // const { username } = req.body;
    // console.log(username)
    // const getUser = await UserModel.findOne({ username });
    const getUser = await UserModel.findById({ _id: id });
    // console.log(getUser)
    res.send(getUser);
  } catch (error) {
    res.send(error);
  }
};

// const getAllUser = async(req,res) => {
//   try {
//     const id = req.params.id
//      const getUser = await UserModel.findById({_id:id})
//      res.send(getUser)

//   } catch (error) {
//     res.send(error)

//   }
// }

const getAllUser = async (req, res) => {
  const getAllUser = await UserModel.find({});
  res.send(getAllUser);
};

module.exports = { RegisterUser, LoginUser, UpdateUser, getUser, getAllUser };
