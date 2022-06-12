import React, { useEffect } from "react";
import "./Feed.css";
import Post from "./Post";
import FlipMove from "react-flip-move";
import TweetBox from "./TweetBox";
import { getTweetByID } from "../Services/CassandraService";

function Feed() {
  useEffect(() => {
    getTweetByID('4.27634e+17');
  }, [])

    return (
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>
  
        <TweetBox />
  
        <FlipMove>
        <Post
            key="null"
            displayName="Hans"
            username="Hans"
            verified="true"
            text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum "
            avatar="/logo.svg"
          />

        </FlipMove>
      </div>
    );
  }
  
  export default Feed;