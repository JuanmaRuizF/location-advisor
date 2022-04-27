import { useState, useEffect } from "react";
import "./App.css";

import Container from "@mui/material/Container";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import InfoCard from "./InfoCard";
// https://developer.foursquare.com/reference/place-details
// https://developer.foursquare.com/reference/place-tips

function App() {
  const [queryValues, setQueryValues] = useState(null);
  const [pictures, setPictures] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3i9kwIT71lD8Ta2qgw60a7bCxO/9nNrw9fCapnuSFRoU=",
    },
  };

  const fetchPictures = async (response) => {
    let updated_response = response;
    let url;

    updated_response["results"].map(async (element) => {
      url =
        "https://api.foursquare.com/v3/places/" +
        element["fsq_id"] +
        "/photos?limit=5";

      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          var singleElement = [];
          response.map((element, index) => {
            singleElement.push(
              element["prefix"] + "200x200" + element["suffix"]
            );
          });
          element["pictureLinks"] = singleElement;
        })
        .then(() => {
          setPictures(response);
          setQueryValues(updated_response);
        })
        .catch((err) => console.error(err));
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // var url =
      //   "https://api.foursquare.com/v3/places/search?ll=45.433633,9.208001&radius=100000&limit=25&sort=distance";
      var url =
        "https://api.foursquare.com/v3/places/search?radius=100000&limit=25&sort=distance";
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          response["results"].map((e) => {
            e["pictureLinks"] = [];
          });
          fetchPictures(response);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((err) => console.error(err));
    };
    fetchData();

    //ll=40.827958,-73.916035&radius=100000 query=cafe&
  }, []);

  return (
    <Container>
      <h1>Location Advisor</h1>
      <hr></hr>

      {queryValues ? (
        <div className="resultGrid">
          {queryValues["results"].map((element, id) => {
            return <InfoCard key={id} element={element} id={id}></InfoCard>;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default App;
