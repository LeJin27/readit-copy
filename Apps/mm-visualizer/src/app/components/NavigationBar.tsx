import * as React from "react";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import { logout } from "../login/action";

export default function NavigationBar() {
  const router = useRouter();

  const navigationItemList = [
    {name: "Dashboard", redirect: "/dashboard"},
    {name: "Mob", redirect: "/mob"},
    {name: "Mash", redirect: "/mash"},
  ]

  const handleLogout = async() => {
    await logout();
    router.push("/login")
  }

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {navigationItemList.map((navItem, index) => (
          <ListItem key={navItem.name} disablePadding>
            <ListItemButton onClick={() => router.push(navItem.redirect)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={navItem.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>

      <List>
        <ListItemButton onClick={() => handleLogout()}>
          <ListItemIcon>
            <LogoutIcon /> 
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box component="nav" sx={{ width: "100%" }}>
          {drawer}
      </Box>
    </Box>
  );
}
