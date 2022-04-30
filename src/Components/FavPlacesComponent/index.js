import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material/";
import { options } from "../../utils";
import InfoCard from "../CardComponent";
import "../../Styles/App.css";

export default function FavPlaces() {
  const [queryValues, setQueryValues] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numberFavs, setNumberFavs] = useState(0);

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
      favItems.map(async (fsq_id) => {
        let url = "https://api.foursquare.com/v3/places/" + fsq_id;
        await fetch(url, options)
          .then((response) => response.json())
          .then(async (response) => {
            console.log(response);
            let pictures = [];
            let url_pictures =
              "https://api.foursquare.com/v3/places/" +
              response.fsq_id +
              "/photos?limit=5";
            response.pictureLinks = await fetch(url_pictures, options)
              .then((response) => response.json())
              .then((response) => {
                response.map((element) => {
                  pictures.push(element.prefix + "200x200" + element.suffix);
                });
                return pictures;
              })
              .catch((err) => console.error(err));
            return response;
          })
          .then((response) => {
            setQueryValues((oldArray) => [...oldArray, response]);
          })

          .catch((err) => console.error(err));
      });
    };

    let favItems = Object.keys(JSON.parse(localStorage.favElements));
    fetchData(favItems);
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <Container>
        <h1>Favourite places</h1>
        <Link to="/">TO MAIN PAGE</Link>
        <div className="resultGrid">
          {queryValues.length > 1
            ? queryValues.map((element, key) => {
                console.log(element);
                return (
                  <InfoCard
                    key={key}
                    element={element}
                    id={key}
                    setNumberFavs={setNumberFavs}
                    isFavPage={true}
                  ></InfoCard>
                );
              })
            : null}
        </div>
      </Container>
    );
  } else {
    return <h3>Loading...</h3>;
  }
}
