import { Route,Routes } from "react-router-dom";
import SignIn from "./components/sign-in";
import SignUp from "./components/sign-up";
import Main from "./components/main";
import Credit from "./components/credit";
import SignOut from "./components/signout";
import ForgetPassword from "./components/forgetPassword";
import React from "react";
import "./index.css";

function App(){
    return (
        <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/forget-password" element={<ForgetPassword/>} />
            <Route path="/main" element={<Main/>} />
            <Route path="/credit" element={<Credit/>} />
            <Route path="/signout" element={<SignOut/>} />
        </Routes>
    );
}
export default App;