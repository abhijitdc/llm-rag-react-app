import { Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAuth } from "../firebase/auth";
import LandingPage from "../Pages/LandingPage";
import Saidenav from "./Sidenav";
import { useState } from "react";
import TopNavBar from "./Topnav";

export default function Layout({}) {
  return <Main />;
}

function Main() {
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
  };

  return (
    <Grid container spacing={10} sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <TopNavBar isDrawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      </Grid>
      <Grid item xs={1}>
        <Saidenav isDrawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      </Grid>
      <Grid item xs={11} sx={{ backgroundColor: "grey.50" }}>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "100vh",
          }}
        >
          {isAuthenticated ? (
            <Box component={Outlet}></Box>
          ) : (
            <Box>
              <LandingPage title="" />
            </Box>
          )}
        </Box>
        {/* <Box>
        <Footer />
      </Box> */}
      </Grid>
    </Grid>
  );
}
