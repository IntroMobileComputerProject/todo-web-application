import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import React from "react";

function SignOut(){
    let navigate = useNavigate();
    let [cookie,removeCookie] = useCookies(['token']); 
    useEffect(() => {
        removeCookie('token');
        navigate('/signin');
    }, []);
    return (
        <div>
            <center>
                <h1>Signing out...</h1>
            </center>
        </div>
    );
}
export default SignOut;