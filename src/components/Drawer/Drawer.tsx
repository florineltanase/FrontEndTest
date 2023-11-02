import * as React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChevronRightTwoToneIcon from "@mui/icons-material/ChevronRightTwoTone";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const [menuItemSelected, setMenuItemSelected] = React.useState<string>("");
  const menuItems = [
    {
      id: 1,
      name: "Home",
      value: "home",
    },
    {
      id: 2,
      name: "Dashboards",
      value: "dashboards",
    },
    {
      id: 3,
      name: "Invoices",
      value: "invoices",
    },
    {
      id: 4,
      name: "Bills",
      value: "bills",
    },
    {
      id: 5,
      name: "Expenses",
      value: "expenses",
    },
    {
      id: 6,
      name: "Reports",
      value: "reports",
    },
    {
      id: 7,
      name: "Accounting",
      value: "accounting",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "white",
        }}
      >
        <Toolbar className="flex justify-between ">
          <div className="text-black">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="text.primary">Accounting</Typography>
              <Typography color="text.primary">{menuItemSelected}</Typography>
            </Breadcrumbs>
          </div>

          <div className="flex gap-[20px]">
            <NotificationsOutlinedIcon className="text-black" />
            <SettingsOutlinedIcon className="text-black" />
            <WbSunnyOutlinedIcon className="text-black" />
            <AccountCircleOutlinedIcon className="text-black" />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#F3F2FE",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((el) => (
            <ListItem
              onClick={() => {
                navigate(el.value);
                setMenuItemSelected(el.name);
              }}
              sx={{
                "& .MuiListItemButton-root:hover": {
                  backgroundColor: "#884B95",
                  color: "#ffffff",
                  borderRadius: "10px",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
              }}
              key={el.id}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <ChevronRightTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={el.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
