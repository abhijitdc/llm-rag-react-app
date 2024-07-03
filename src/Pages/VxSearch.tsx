import { Grid, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-router-dom";

function VxSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchTerm }),
      };

      const response = await fetch(
        "http://0.0.0.0:9080/api/search",
        requestOptions
      );
      await response.json().then((data) => {
        setSearchResults(data.answer);
        console.log(searchResults);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} alignContent="center">
        <Grid item xs={12}>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{searchResults}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default VxSearch;
