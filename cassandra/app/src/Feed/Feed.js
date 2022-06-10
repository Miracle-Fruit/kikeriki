import React from "react";
import Tweet from "../Tweet/Tweet";
import "./Feed.css";

function Feed() {
    return (
        <div className="feed">
        <h2>Example Feed</h2>
        <Tweet />
        </div>
    );
}


export default Feed;