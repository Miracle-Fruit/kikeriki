import React, { useEffect, useState, forwardRef } from "react";
import "./Feed.css";
import Post from "./Post";
import FlipMove from "react-flip-move";
import TweetBox from "./TweetBox";
import { restURL, authToken } from "../Services/CassandraService";

const Feed = forwardRef(
  ({ user }, ref) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // const getTweetByID = async (tweetID) => {
    //   if (authToken == null) {
    //     setTimeout(getTweetByID, 1000, tweetID);
    //   } else {
    //     const response = await fetch(restURL + '/v2/keyspaces/twitter/tweets/' + tweetID, {
    //       method: 'GET',
    //       credentials: "include",
    //       headers: {
    //         'X-Cassandra-Token': authToken
    //       }
    //     });
    //     const jsonData = await response.json();
    //     setPosts([jsonData]);
    //   }
    // };

    const getMultipleTweetsByID = async (IDList) => {
      if (authToken == null) {
        setTimeout(getMultipleTweetsByID, 1000, IDList);
      } else {
        const response = await fetch(restURL + `/v2/keyspaces/twitter/tweets?where={"id":{"$in":[${IDList.map(x => encodeURIComponent('"'+ x + '"'))}]}}`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'X-Cassandra-Token': authToken
          }
        });
        const jsonData = await response.json();
        setPosts(jsonData.data);
      }
    };


    //getTweetByID('4.27634e+17');
    getMultipleTweetsByID(["4.27634e+17", "5.99669e+17"])
  }, [])



  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.author}
            username={post.author}
            verified={true}
            text={post.content}
            likes={post.number_of_likes}
            retweets={post.number_of_shares}
            avatar="/logo.svg"
          />
        ))}
      </FlipMove>
    </div>
  );
});

export default Feed;