import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { useAuth } from "../firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

interface Props {
  title: string;
}

export default function LandingPage(props: Props) {
  const { authUser, isAuthenticated } = useAuth();

  const signInWithGoogle = async () =>
    signInWithPopup(auth, provider).then(() => {
      // console.log("Firebase Auth User IS ", authUser?.displayName);
    });
  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          textAlign: "center",
          backgroudnColor: "grey.200",
        }}
      >
        {isAuthenticated ? (
          <Box>
            <Paper
              elevation={1}
              sx={{ p: 5, borderRadius: 10, backgroundColor: "grey.100" }}
            >
              <Typography variant="h5" component="div">
                Welcome
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {authUser?.displayName}
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Box>
            <Typography
              component="div"
              textAlign={"center"}
              sx={{ flexGrow: 1, textEmphasis: "bold" }}
            >
              {props.title}
            </Typography>

            <Button variant="contained" onClick={signInWithGoogle}>
              Sign In
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
