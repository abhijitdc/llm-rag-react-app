import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

interface Props {
  title: string;
  icon: React.ReactNode;
  pagelink: string;
}

export default function BasicCard(props: Props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        {props.icon}
      </CardContent>
      <CardActions>
        <Link to={props.pagelink}>Learn More</Link>
      </CardActions>
    </Card>
  );
}
