import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Badge, Grid, CircularProgress } from "@mui/material/";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./Styles/App.css";
import { options } from "./utils";
import InfoCard from "./Components/CardComponent";
import UserInputComponent from "./Components/UserInputComponent";

function App() {
  const [queryValues, setQueryValues] = useState([]); // will contain all the data to be mapped.
  const [loaded, setLoaded] = useState(false);

  const [fetchUrl, setFetchUrl] = useState("");
  const [numberFavs, setNumberFavs] = useState(0);

  useEffect(() => {
    // asking for geolocalisation requirement. In case that it is allowed, it is edited and fetched
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      var crd = pos.coords;
      setFetchUrl(
        "https://api.foursquare.com/v3/places/search?radius=100000&ll=" +
          crd.latitude +
          "," +
          crd.longitude +
          "&limit=10&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id,rating"
      );
      // console.log("Latitude : " + crd.latitude);
      // console.log("Longitude: " + crd.longitude);
    }

    function error(err) {
      // in case user blocks geolocalisation, set a default url
      setFetchUrl(
        "https://api.foursquare.com/v3/places/search?radius=100000&ll=27.983375,-15.691567&limit=10&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id,rating"
      );
    }
    navigator.geolocation.getCurrentPosition(success, error, options); //ask for user permission for geolocalisation on page load (if not asked previously)

    //checking for localStorage number of fav elements.
    if (!localStorage.favElements) {
      // if it doesn't exist (first time that user openes the page), create the localStorage variable and set the number to 0
      setNumberFavs(0);
      localStorage.setItem("favElements", JSON.stringify({}));
    } else {
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length); //return the nº of fav elements
    }
  }, []);

  //this will be loaded every time fetchUrl is modified, so if the user selects a new location, the URL is edited and the fetch is run automatically.
  // Once it is loaded, set the loaded variable to true to show the changes

  const fetchData = async () => {
    await fetch(fetchUrl, options)
      .then((response) => response.json())
      .then((response) => {
        let editedResponse = response.results;

        editedResponse.map((element) => {
          let res = [];
          element["photos"].map((img) => {
            res.push(img.prefix + "200x200" + img.suffix); //the format for the pictures returned from API is not suitable so it is prepared here.
          });
          element.photos = res;
        });
        return editedResponse;
      })
      .then((response) => {
        setQueryValues(response); //set all the fetched values to the state that will be used to map everything into cards.
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setLoaded(false);
    fetchData();
  }, [fetchUrl]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          <h1>Location Advisor</h1>
        </Grid>
        <Grid item xs={6}>
          <Link to="/favourite">
            <h1 className="favButton">
              {/* badge contains the number of fav elements and is used as a link to /favourite page*/}
              <Badge badgeContent={numberFavs} color="primary">
                <FavoriteIcon color="error" sx={{ fontSize: 35 }} />
              </Badge>
            </h1>
          </Link>
        </Grid>
      </Grid>
      <hr className="separatingBar"></hr>
      {/* menu for fetching new data values */}
      <UserInputComponent setFetchUrl={setFetchUrl}></UserInputComponent>
      <hr></hr>
      {loaded ? (
        //data loaded -> map through it and return each of the cards with place information.
        <Grid container className="gridContainer">
          {queryValues.map((element, id) => {
            return (
              <Grid item className="gridItem" key={id}>
                <InfoCard
                  element={element}
                  id={id}
                  setNumberFavs={setNumberFavs}
                ></InfoCard>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        // data not loaded, return a loading component
        <div className="loadingComponent">
          <CircularProgress size="8rem" />
        </div>
      )}
    </Container>
  );
}

export default App;
