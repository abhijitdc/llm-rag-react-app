import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Button, Grid, Stack, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../firebase/auth";
import { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const drawerWidth = 240;

interface Props {
  toggleDrawer: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function TopNavBar(props: Props) {
  const { authUser, isAuthenticated, signOut } = useAuth();

  const navigate = useNavigate();

  const signInWithGoogle = async () =>
    signInWithPopup(auth, provider).then(() => {
      // console.log("Firebase Auth User IS ", authUser?.displayName);
    });

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Firebase Auth Redirect ", authUser?.displayName);
      navigate("/");
    } else {
      console.log("Firebase Auth User IS ", authUser?.displayName);
      console.log("Firebase User Profile ", authUser?.photoURL);
    }
  }, [isAuthenticated]);

  const handleDrawerOpen = () => {
    props.toggleDrawer(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={props.isDrawerOpen}>
        <Toolbar>
          <Grid container>
            <Grid item sm={3}>
              <Stack direction="row">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(props.isDrawerOpen && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Button
                  variant="text"
                  sx={{ color: "white", fontSize: "20px" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  LLM Playground
                </Button>
              </Stack>
            </Grid>
            <Grid item sm={9}>
              <Stack
                direction="row"
                sx={{ justifyContent: "flex-end", display: "flex" }}
              >
                <Box>
                  {authUser === null ? (
                    <Button
                      variant="text"
                      color="inherit"
                      onClick={signInWithGoogle}
                    >
                      Sign In
                    </Button>
                  ) : (
                    <Button variant="text" color="inherit" onClick={signOut}>
                      Sign Out
                    </Button>
                  )}
                </Box>
                <Box>
                  <Avatar
                    src={authUser?.photoURL as string}
                    sx={{ width: 35, height: 35 }}
                  />
                </Box>
                {/* <Box>
                  <Typography variant="caption">
                    {authUser === null ? "Guest" : authUser?.displayName}
                  </Typography>
                </Box> */}
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
