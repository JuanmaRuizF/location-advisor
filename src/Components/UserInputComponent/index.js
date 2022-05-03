import React, { useState } from "react";
import { Grid, Button } from "@mui/material/";

import DistanceSlider from "./DistanceSliderComponent";
import SortByComponent from "./SortByComponent";
import MapCoordinatesComponent from "./MapCoordinatesComponent";
import NumberElementsSliderComponent from "./NumberElementsSliderComponent";

export default function UserInputComponent(props) {
  const { setFetchUrl } = props;
  //values for the user inputs
  const [valueDistance, setValueDistance] = useState(50);
  const [numberElements, setNumberElements] = useState(25);
  const [valueSorted, setValueSorted] = useState("relevance");
  const [latlong, setLatlong] = useState(",");
  const [errorSearch, setErrorSearch] = useState(false);

  //method to edit the url with the selected fields so that the App is rerendered with the new fetched data.
  const search = () => {
    if (latlong === ",") {
      //if the user has not selected a place, display error message
      setErrorSearch(true);
      setTimeout(() => {
        setErrorSearch(false);
      }, 5000);
      return;
    }
    var url =
      "https://api.foursquare.com/v3/places/search?radius=" +
      valueDistance * 1000 +
      "&limit=" +
      numberElements +
      "&ll=" +
      latlong +
      "&sort=" +
      valueSorted +
      "&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id,rating";
    setFetchUrl(url); //this will trigger rerender of the fetch method in the App.js file
  };

  //calling each of the components that contain the different parts of the user input
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} marginBottom={1}>
        <MapCoordinatesComponent
          latlong={latlong}
          setLatlong={setLatlong}
        ></MapCoordinatesComponent>
      </Grid>

      <Grid xs={12} sm={12} md={6} lg={6} xl={6} marginBottom={1}>
        <SortByComponent
          valueSorted={valueSorted}
          setValueSorted={setValueSorted}
        ></SortByComponent>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
        <DistanceSlider
          valueDistance={valueDistance}
          setValueDistance={setValueDistance}
        ></DistanceSlider>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
        <NumberElementsSliderComponent
          numberElements={numberElements}
          setNumberElements={setNumberElements}
        ></NumberElementsSliderComponent>
      </Grid>

      <Grid item xs={12} className="Search">
        <Button variant="outlined" onClick={search}>
          Search
        </Button>
      </Grid>

      {errorSearch ? (
        <>
          <Grid item xs={12} className="errorText">
            Haven't selected coordinates.
          </Grid>
        </>
      ) : null}
    </Grid>
  );
}
