import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../firebase/auth";
import { useEffect } from "react";

export default function ButtonAppBar() {
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
    } else console.log("Firebase Auth User IS ", authUser?.displayName);
  }, [isAuthenticated]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
        <Container>
          <Toolbar>
            <Grid container direction="row">
              <Grid item sm={3}>
                <Button
                  variant="text"
                  sx={{ color: "grey.A100" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  LLM Playground
                </Button>
              </Grid>
              <Grid item sm={2}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => {
                    navigate("/search");
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item sm={2}>
                <Box>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => {
                      navigate("/agent");
                    }}
                  >
                    Agent
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={2}>
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
              </Grid>
              <Grid item sm={3}>
                <Stack direction="row" spacing={1}>
                  <Box>
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      src={authUser?.photoURL as string}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="brown">
                      {authUser === null ? "Guest" : authUser?.displayName}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
