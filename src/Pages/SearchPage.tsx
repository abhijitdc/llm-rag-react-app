import { useState } from "react";
import { Box, Typography, Stack, TextField } from "@mui/material";
import { Form } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async () => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Typography variant="body1" mb={1}>
          {searchResults}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              sx={{
                width: "50vh",
              }}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchPage;
