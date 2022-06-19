import React, { forwardRef, useState, useEffect } from "react";
import "./Profile.css";
import Post from "../Feed/Post";
import FlipMove from "react-flip-move";
import ProfileBox from "./ProfileBox";
import { restURL, authToken } from "../Services/CassandraService";
import { TailSpin } from "react-loader-spinner";

const Profile = forwardRef(
  ({ user }, ref) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getOwnTweets();
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getOwnTweets = async () => {
      if (authToken == null) {
        setTimeout(getOwnTweets, 1000);
      } else {
        const response = await fetch(restURL + 
          `/v2/keyspaces/twitter/tweets?where={"author_id":{"$eq":[${user.userID}]}}&fields=author,number_of_likes,number_of_shares,id,content,date_time&sort={"date_time":"desc"}&page-size=100`, {
          method: 'GET',
          credentials: "include",
          headers: {
            'X-Cassandra-Token': authToken
          }
        });
        const jsonData = await response.json();
        setPosts(jsonData.data);
        setLoading(false)
      }
    };
  
    return (
      <div className="feed">
        <div className="feed__header">
          <h2>{user.username === null ? user.userID : user.username}</h2>
        </div>

        <ProfileBox user={user} />
        {loading ? <div className="loading_spinner"><TailSpin color="var(--twitter-color)" /></div> :
        <FlipMove>
          {posts.map((post) => (
          <Post
            key={post.id + post.date_time}
            date={post.date_time}
            displayName={post.author}
            username={post.author}
            verified={false}
            text={post.content}
            likes={post.number_of_likes}
            retweets={post.number_of_shares}
            avatar={"/logo.svg"}
          />
          ))}
        </FlipMove>}
      </div>
    );
  });

export default Profile;