//import React from "react"
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./UserLogin.css"

export default function UserLogin(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let toast = require("./../../toast_bar");

    const login = (e) => {
        e.preventDefault();

        try{
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                username : username,
                email : username,
                password : password
            })
            .then((resposnse) => {
                console.log(resposnse.data);
                toast.msg(resposnse.data.message, "green", 3000);
                navigate("/user/profile");
            },
            (err) => {
                console.log("An error occured!");
                console.log(err);
                toast.msg("Incorrect credential", "red", 2500);
            });
        }
        catch(error){
            console.log("Opps!, an error occured!");
            toast.msg("Opps!, an error occured!", "red", 2500);
        }

        console.log(username);
        console.log(password);
    }

    return (
        <>
            <div className="container" align="center">
                <h2>User Login</h2>
                <div className="col-5 login">
                    <form onSubmit={login}>
                        <input type="text" placeholder="Username or Email" className="textField" onChange={(e)=>setUsername(e.target.value)} />
                        <br/>
                        <input type="password" placeholder="Password" className="textField" onChange={(e)=>setPassword(e.target.value)} />
                        <br/>
                        <button type="submit" className="btn btn-primary">LOGIN</button>
                    </form>
                </div>
            </div>
        </>
    );
} 