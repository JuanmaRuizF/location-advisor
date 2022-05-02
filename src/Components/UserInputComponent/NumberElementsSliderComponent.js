import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function SliderComponent(props) {
  const { numberElements, setNumberElements } = props;

  const handleChange = (event, newValue) => {
    setNumberElements(newValue);
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        Number of elements to return
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
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
