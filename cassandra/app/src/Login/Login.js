import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "./Login.css";


function Login( {setUser} ) {
    const [username, setUserName] = useState();
    const [userid, setUserID] = useState();

    const handleSubmit = () => {
        setUser({userID: userid, username: username});
    }

    return (
        <>
            <header className="container">
                <div className="logo">
                    <img src="/logo.svg" alt="Kikeriki Logo" />
                </div>
            </header>

            <main className="container">
                <h1>Log in to Kikeriki</h1>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <label className="username">Username</label><br />
                            <input type="text" id="username" onChange={e => setUserName(e.target.value)} />
                        </div>
                        <div className="inputs">
                            <label className="userid">UserID</label><br />
                            <input type="text" id="userid" onChange={e => setUserID(e.target.value)} />
                        </div>
                        <br />
                        <button className="button" type="submit">Login</button>
                    </form>
                </div>
            </main>
        </>
    );
}

Login.propTypes = {
    setUser: PropTypes.func.isRequired
};

export default Login;