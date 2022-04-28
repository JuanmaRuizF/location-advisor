import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function SliderComponent() {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        Maximum distance for the search
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Box sx={{ width: 300 }}>
            <Slider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              defaultValue={50}
              min={0}
              max={100}
            />
          </Box>
        </Grid>
        <Grid item>{value}km</Grid>
      </Grid>
    </>
  );
}
