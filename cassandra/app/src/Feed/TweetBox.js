import React, { useState, forwardRef } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import { restURL, authToken } from "../Services/CassandraService";

const TweetBox = forwardRef(
    ({ user }, ref) => {
        const [tweetMessage, setTweetMessage] = useState("");

        const sendTweetTweets = async () => {
            if (authToken == null) {
                setTimeout(sendTweetTweets, 1000);
            } else {
                var today = new Date();
                const dateTime = today.toISOString()
                await fetch(restURL +
                    `/v2/keyspaces/twitter/tweets`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'X-Cassandra-Token': authToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: (Math.random() + 1).toString(36).substring(2),
                        number_of_likes: 0,
                        author: user.username,
                        author_id: user.userID,
                        content: tweetMessage,
                        country: null,
                        date_time: dateTime,
                        language: "en",
                        latitude: null,
                        longitude: null,
                        number_of_shares: 0,

                    })
                });
            }
        };

        function handleTweet() {
            sendTweetTweets();
            setTweetMessage("");
        }

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

                    <Button className="tweetBox__tweetButton" onClick={handleTweet}>
                        Kikeriki
                    </Button>
                </form>
            </div>
        );
    });

export default TweetBox;