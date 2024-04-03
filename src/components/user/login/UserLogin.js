//import React from "react"
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./UserLogin.css"

export default function UserLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        console.log(process.env.BACKEND_URL);
        
        try{
            axios.post("https://pear-centipede-yoke.cyclic.app/user/login", {
                username : username,
                email : username,
                password : password
            })
            .then((resposnse) => {
                console.log(resposnse.data);
            },
            (err) => {
                console.log("An error occured!");
            });
        }
        catch(error){
            console.log("Opps!, an error occured!");
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