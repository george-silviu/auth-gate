import { NavLink, useLocation } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

import { SidebarContainer, StyledListItemIcon } from "./sidebar.styles";

const sidebarItems = [
  { name: "Dashboard", link: "/dashboard", Icon: DashboardIcon },
  { name: "Partners", link: "/partners", Icon: HandshakeIcon },
  { name: "Users", link: "/users", Icon: PersonIcon },
  { name: "Leads", link: "/leads", Icon: GroupIcon },
  { name: "Resources", link: "/resources", Icon: AutoStoriesIcon },
  { name: "E-learning", link: "/e-learning", Icon: SchoolIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <List>
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              button
              key={index}
              style={
                location.pathname === item.link
                  ? {
                      borderRadius: "10px",
                      backgroundColor: "#6246ea",
                      color: "#fffffe",
                    }
                  : { color: "#2b2c34", borderRadius: "10px" }
              }
            >
              <StyledListItemIcon style={{ minWidth: "40px" }}>
                <item.Icon
                  style={
                    location.pathname === item.link
                      ? { color: "#e45858" }
                      : { color: "#e45858" }
                  }
                />
              </StyledListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
