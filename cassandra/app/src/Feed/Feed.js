import React, { useEffect, useState, forwardRef } from "react";
import "./Feed.css";
import Post from "./Post";
import FlipMove from "react-flip-move";
import TweetBox from "./TweetBox";
import { restURL, authToken } from "../Services/CassandraService";
import { TailSpin } from  'react-loader-spinner'
import Switch from "react-switch";

const Feed = forwardRef(
  ({ user }, ref) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("new"); 

  useEffect(() => {
    getNewTweets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNewTweets = async () => {
    if (authToken == null) {
      setTimeout(getNewTweets, 1000);
    } else {
      const response = await fetch(restURL + 
        `/v2/keyspaces/twitter/start_view_new?where={"user_id_x":{"$eq":[${user.userID}]}}&fields=author,number_of_likes,number_of_shares,id,content,date_time&sort={"date_time":"desc"}&page-size=100`, {
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

  const getBestTweets = async () => {
    if (authToken == null) {
      setTimeout(getBestTweets, 1000);
    } else {
      const response = await fetch(restURL + 
        `/v2/keyspaces/twitter/start_view_like?where={"user_id_x":{"$eq":[${user.userID}]}}&fields=author,number_of_likes,number_of_shares,id,content,date_time&sort={"number_of_likes":"desc"}&page-size=100`, {
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

  function handleChange() {
    if (view === "new") {
      setView("best");
      getBestTweets();
      setLoading(true);
      setPosts([]);
    } else {
      setView("new");
      getNewTweets();
      setLoading(true);
      setPosts([]);
    }
  }



  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
        <div className="mode_selection">
        <h4>Best</h4>
        <Switch className="switch" onChange={handleChange} 
        checked={view==="new" ? true : false} 
        checkedIcon={false} uncheckedIcon={false} 
        onColor={"#50b7f5"} offColor={"#50b7f5"}/>
        <h4>New</h4>
        </div>
      </div>

      <TweetBox user={user} />
      {loading ? <div className="loading_spinner"><TailSpin color="var(--twitter-color)" /></div> :
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            date={post.date_time}
            displayName={post.author}
            username={post.author}
            verified={true}
            text={post.content}
            likes={post.number_of_likes}
            retweets={post.number_of_shares}
            avatar={"https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"}
          />
        ))}
      </FlipMove>
  }
    </div>
  );
});

export default Feed;