import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, CircularProgress, Grid } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import { options } from "../../utils";
import InfoCard from "../CardComponent";
import "../../Styles/App.css";

export default function FavPlaces() {
  const [queryValues, setQueryValues] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numberFavs, setNumberFavs] = useState(0);
  const [tempValues, setTempValues] = useState([]);

  useEffect(() => {
    if (!localStorage.favElements) {
      setNumberFavs(0);
      localStorage.setItem("favElements", JSON.stringify({}));
    } else {
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
    }
  }, []);

  useEffect(() => {
    const fetchData = async (favItems) => {
      var arrayValues = [];
      setTempValues([]);
      favItems.map(async (fsq_id) => {
        let url =
          "https://api.foursquare.com/v3/places/" +
          fsq_id +
          "?&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id";
        await fetch(url, options)
          .then((response) => response.json())
          .then((response) => {
            setTempValues((prevArray) => [...prevArray, response]);
          });
        return arrayValues;
      });
    };

    setLoaded(false);
    let favItems = Object.keys(JSON.parse(localStorage.favElements));
    fetchData(favItems);
  }, [numberFavs]);

  useEffect(() => {
    if (
      tempValues.length ===
      Object.keys(JSON.parse(localStorage.favElements)).length
    ) {
      tempValues.map((element) => {
        let pictures = [];
        element["photos"].map((e) => {
          pictures.push(e.prefix + "200x200" + e.suffix);
        });
        element.photos = pictures;
      });
      setQueryValues(tempValues);
      setLoaded(true);
    }
  }, [tempValues]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Favourite places</h1>
        </Grid>
        <Grid item xs={6}>
          <Link to="/">
            <h1 className="homeButton">
              <HomeIcon color="primary" sx={{ fontSize: 40 }} />
            </h1>
          </Link>
        </Grid>
      </Grid>

      <hr></hr>
      {loaded ? (
        <div className="resultGrid">
          {queryValues.map((element, key) => {
            return (
              <InfoCard
                key={key}
                element={element}
                id={key}
                setNumberFavs={setNumberFavs}
                isFavPage={true}
              ></InfoCard>
            );
          })}
        </div>
      ) : (
        <div className="loadingComponent">
          <CircularProgress size="8rem" />
        </div>
      )}
    </Container>
  );
}
