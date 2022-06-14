import React from "react";
import './ProfileBox.css'
import { Avatar } from "@mui/material";

function ProfileBox() {

    return (
        <div className="profile">
            <div className="banner">
                <div className="avatar"><img src="./logo.svg" /></div>
            </div>

            <div className="profileData">
                <h1>Hans</h1>
                <h2>@Hans63</h2>

                <p>Just a Bird</p>

                <div className="follow">
                    <span>
                    <strong>17</strong> Follower
                    </span>
                    <span>
                    <strong>97</strong> Following 
                    </span>
                </div>
            </div>
            <div className="tabs">
                <div className="active">Kikerikis</div>
                <div className="disabled">Kikerikis and Answers</div>
                <div className="disabled">Media</div>
                <div className="disabled">Likes</div>
            </div>
        </div>
    );
}

export default ProfileBox;