import { Grid, Input, Typography } from "@mui/material";
import { useState } from "react";

function VxAgent() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Grid container spacing={2} alignContent="center">
        <Grid item xs={12}>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{searchTerm}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default VxAgent;
