import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material/";

export default function SortByComponent(props) {
  const { valueSorted, setValueSorted } = props;

  const handleChange = (event) => {
    setValueSorted(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={valueSorted}
            label="Sort By"
            onChange={handleChange}
          >
            <MenuItem value={"relevance"}>Relevance</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
            <MenuItem value={"distance"}>Distance</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
