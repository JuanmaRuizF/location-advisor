import React, { useState } from "react";
import DistanceSlider from "./DistanceSliderComponent";
import { Grid, Button } from "@mui/material/";
import SortByComponent from "./SortByComponent";
import MapCoordinatesComponent from "./MapCoordinatesComponent";
import NumberElementsSliderComponent from "./NumberElementsSliderComponent";
import "../../Styles/App.css";

export default function UserInputComponent(props) {
  const { fetchUrl, setFetchUrl } = props;
  const [valueDistance, setValueDistance] = useState(50);
  const [numberElements, setNumberElements] = useState(25);
  const [valueSorted, setValueSorted] = useState("relevance");
  const [latlong, setLatlong] = useState(",");
  const [errorSearch, setErrorSearch] = useState(false);

  const search = () => {
    if (latlong === ",") {
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
      "&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id";
    console.log(url);
    setFetchUrl(url);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <MapCoordinatesComponent
          latlong={latlong}
          setLatlong={setLatlong}
        ></MapCoordinatesComponent>
      </Grid>

      <Grid item xs={6}>
        <SortByComponent
          valueSorted={valueSorted}
          setValueSorted={setValueSorted}
        ></SortByComponent>
      </Grid>
      <Grid item xs={6}>
        <DistanceSlider
          valueDistance={valueDistance}
          setValueDistance={setValueDistance}
        ></DistanceSlider>
      </Grid>
      <Grid item xs={6}>
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
