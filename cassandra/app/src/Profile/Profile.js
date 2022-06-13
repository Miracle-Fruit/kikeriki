import React from "react";
import "./Profile.css";
import Post from "../Feed/Post";
import FlipMove from "react-flip-move";

function Profile() {

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Profile</h2>
      </div>

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

export default Profile;