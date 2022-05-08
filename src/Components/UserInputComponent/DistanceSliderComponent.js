import React from "react";
import { Box, Slider, Grid, Typography } from "@mui/material";

export default function SliderComponent(props) {
  const { valueDistance, setValueDistance } = props;

  const handleChange = (event) => {
    setValueDistance(event.target.value);
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        Search Radius
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {/* <Box sx={{ width: "10em" }}> */}
          <Box sx={{ width: 300 }}>
            <Slider
              onChange={handleChange}
              valueLabelDisplay="auto"
              defaultValue={50}
              min={0}
              max={100}
            />
          </Box>
        </Grid>
        <Grid item>{valueDistance}km</Grid>
      </Grid>
    </>
  );
}
