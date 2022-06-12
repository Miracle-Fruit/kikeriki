import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Button } from "@mui/material";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src="/logo.svg" alt="Bird" className="sidebar__twitterIcon" />

      <SidebarOption Icon={HomeIcon} text="Home" active={true} />
      <SidebarOption Icon={SearchIcon} text="Explore" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
      Kikeriki 
      </Button>
    </div>
  );
}

export default Sidebar;