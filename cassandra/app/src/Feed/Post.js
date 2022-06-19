import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";

const Post = forwardRef(
  ({ displayName, username, verified, text, avatar, likes, retweets, date}, ref) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                  <br></br>
                  {new Date(date).toLocaleString()}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" className="disabled" />
            <div className="stats">
            <RepeatIcon fontSize="small" className="disabled" />
            <div className="stats_text">{retweets}</div>
            </div>
            <div className="stats">
            <FavoriteBorderIcon fontSize="small" className="disabled" />
            <div className="stats_text">{likes}</div>
            </div>
            <PublishIcon fontSize="small" className="disabled" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;