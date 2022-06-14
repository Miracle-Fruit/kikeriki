import React, { forwardRef } from "react";
import './ProfileBox.css'

const ProfileBox = forwardRef(
    ({ user }, ref) => {
    return (
        <div className="profile">
            <div className="banner">
                <div className="avatar"><img alt="Bird" src="./logo.svg" /></div>
            </div>

            <div className="profileData">
                <h1>{user.username}</h1>
                <h2>@{user.username}</h2>

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
});

export default ProfileBox;