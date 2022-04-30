import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function SliderComponent(props) {
  const { valueDistance, setValueDistance } = props;

  const handleChange = (event, newValue) => {
    setValueDistance(newValue);
  };

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        Radius for search
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
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
