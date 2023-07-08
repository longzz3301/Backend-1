import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./register";
import Login from "./login";

import PrivateRoute from "./layout/PrivateRoute";
import PublicRoute from "./layout/PublicRoute";
import Logout from "./Logout";
import User from "./getUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          
          
          <Route path="/user" element={<User />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
