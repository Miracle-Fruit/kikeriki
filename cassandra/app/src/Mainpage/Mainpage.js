import React from "react";
import Feed from "../Feed/Feed";
import "./Mainpage.css";

function Mainpage() {
    return (
        <div className="mainpage">
            <div className="sidebar"></div>
            <Feed />
            <div className="sidebar"></div>
        </div>
    );
}


export default Mainpage;