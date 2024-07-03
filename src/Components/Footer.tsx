import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        backgroundColor: "grey.100",
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Typography variant="caption" component="h2">
          Just Footer{" What is This FOOTER"}
        </Typography>
      </Box>
    </Container>
  );
}
