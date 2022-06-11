import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";

function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar src="/logo.svg" />
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="What's happening in the coop?"
                        type="text"
                    />
                </div>

                <Button type="submit"className="tweetBox__tweetButton">
                    Kikeriki 
                </Button>
            </form>
        </div>
    );
}

export default TweetBox;