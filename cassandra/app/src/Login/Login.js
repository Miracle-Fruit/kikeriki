import React from "react";
import "./Login.css";


function Login() {
    return (
        <>
            <header className="container">
                <div className="logo">
                    <img src="./logo.svg" alt="Logo do Twitter" />
                </div>
            </header>

            <main className="container">
                <h1>Log in to Kikeriki</h1>
                <div className="container">
                    <form className="">
                        <div className="inputs">
                            <label className="username" for="username">Username</label><br />
                            <input type="text" id="username" />
                        </div>
                        <div className="inputs">
                            <label className="userid" for="userid">UserID</label><br />
                            <input type="text" id="userid" />
                        </div>
                        <br />
                        <button className="button" type="submit">Login</button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;