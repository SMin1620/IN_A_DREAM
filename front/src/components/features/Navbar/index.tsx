import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import logo from "../../../assets/logo/gggmmm.png";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: matches ? "center" : "flex-start", // 화면이 축소될 때 로고는 왼쪽으로 정렬되도록 변경
        }}
      >
        {/* Logo */}
        {matches && (
          <img
            src={logo}
            alt="Logo"
            style={{ maxHeight: "50px", marginBottom: "10px" }}
          />
        )}
        {matches ? (
          <Tabs sx={{ flexGrow: 1 }}>
            <Tab label="GALLERY" style={{ color: "#fff" }} />
            <Tab label="SHOP" style={{ color: "#fff" }} />
            <Tab label="MYPAGE" style={{ color: "#fff" }} />
            <Tab label="STATISTICS" style={{ color: "#fff" }} />
          </Tabs>
        ) : (
          <>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            {/* 햄버거 아이콘 추가 */}
          </>
        )}
      </Toolbar>

      {/* Drawer for mobile view */}
      {!matches && (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            {/* Add your nav items here */}
            {["GALLERY", "SHOP", "MYPAGE", "STATISTICS"].map((text) => (
              <ListItemButton
                key={text}
                onClick={() => console.log(`${text} clicked`)}
              >
                {text}
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
};

export default NavBar;
