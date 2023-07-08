const { UserModel } = require("../model/UserSchema");
const jwt = require("jsonwebtoken");

// const authorization = async (req, res, next) => {
//   try {
//     const userRole = req.user.Role;

//     console.log(  "day la userRole",userRole)
//     if (userRole.includes("Admin")) {
//       next();
//     } else {
//       res.send("User khong co quyen");
//     }
//   } catch (error) {
//     res.send(error);
//   }
// };

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "long123");
    //   console.log(decoded)
    const { username, id, role } = decoded;

    const checkUser = await UserModel.findOne({ username: username });
    console.log("checkUser :", checkUser);
    if (checkUser) {
      const UserRole = checkUser.Role;
      const UserId = checkUser.id;
      const UserName = checkUser.username;
      req.userId = UserId;
      req.role = UserRole;
      req.username = UserName;
      console.log(req.userId, req.role, req.username);
      // res.send(checkUser);
      next();
    } else {
      res.send("error");
    }
  } catch (error) {
    res.send(error);
  }
};

const getAllUser = async (req, res, next) => {
  const checkRole = req.role;
  console.log(checkRole)
  if (checkRole.includes('Admin')) {
    const getAllUser = await UserModel.find({});
    console.log(getAllUser);
    res.send(getAllUser);
  }else {
    res.send('user k co quyen')
  }
};

const DeleteUser = async (req, res, next) => {
  // const id = req.params.id;
  try {
    const username = req.body.username;
    console.log(username);
    const CurrentUser = req.username;
    console.log(CurrentUser);

    if (CurrentUser === username) {
      res.send("can not remove yourself");
    } else {
      const DeleteUser = await UserModel.findOneAndDelete({
        username: username,
      });
      console.log(DeleteUser);
      res.send("delete success");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAllUser, DeleteUser, checkToken };
