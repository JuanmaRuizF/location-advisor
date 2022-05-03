import React from "react";
import { Box, Slider, Grid, Typography } from "@mui/material/";

export default function SliderComponent(props) {
  const { numberElements, setNumberElements } = props;

  const handleChange = (event) => {
    setNumberElements(event.target.value);
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        Number of elements to return
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          {/* <Box sx={{ width: "10em" }}> */}
          <Box sx={{ width: 300 }}>
            <Slider
              onChange={handleChange}
              valueLabelDisplay="auto"
              defaultValue={25}
              min={1}
              max={50}
            />
          </Box>
        </Grid>
        <Grid item>{numberElements} elements</Grid>
      </Grid>
    </>
  );
}
