import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom'

function Sidebar(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div>
      <img src="/logo.svg" alt="Bird" className="sidebar__twitterIcon" />
      </div>
      <div onClick={() => {navigate("/home");}}>
      <SidebarOption Icon={HomeIcon} text="Home" active={location.pathname === "/feed" ? true : false} />
      </div>
      <div onClick={() => {navigate("/profile");}}>
      <SidebarOption Icon={PermIdentityIcon} text="Profile" active={location.pathname === "/profile" ? true : false} />
      </div>
      <div onClick={() => {props.logout()}}>
      <SidebarOption Icon={Logout} text="Logout" />
      </div>

      <Button variant="outlined" className="sidebar__tweet" fullWidth disabled>
      Kikeriki 
      </Button>
    </div>
  );
}

export default Sidebar;