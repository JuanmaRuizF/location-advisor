import { useState, useEffect } from "react";
import "./Styles/App.css";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Slider from "./Components/UserInputComponent/SliderComponent";
import FavPlaces from "./Components/FavPlacesComponent";
import InfoCard from "./Components/CardComponent";
import ReactPaginate from "react-paginate";
import { options } from "./utils";

function App() {
  const [queryValues, setQueryValues] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchPictures = async (element) => {
    let pictures = [];
    let url =
      "https://api.foursquare.com/v3/places/" +
      element.fsq_id +
      "/photos?limit=5";

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        response.map((element) => {
          pictures.push(element.prefix + "200x200" + element.suffix);
        });
      })
      .catch((err) => console.error(err));
    // console.log(pictures);
    return pictures;
  };

  const fetchData = async () => {
    // var url =
    //   "https://api.foursquare.com/v3/places/search?ll=45.433633,9.208001&radius=100000&limit=25&sort=distance";
    var url =
      "https://api.foursquare.com/v3/places/search?radius=100000&limit=25&ll=42.433633,9.208001";
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        response.results.map(async (e) => {
          e.pictureLinks = await fetchPictures(e);
        });
        return response;
      })
      .then((response) => {
        setQueryValues(response);
      })
      .catch((err) => console.error(err));
  };

  // console.log(queryValues);
  return (
    <Container>
      <h1>Location Advisor</h1>
      <Link to="/favourite">TO FAV</Link>
      <button
        onClick={async () => {
          await fetchData().then(() => {
            setLoaded(true);
          });
        }}
      >
        Cargar
      </button>

      <Slider></Slider>
      <hr></hr>
      {loaded ? (
        <div className="resultGrid">
          {/* {console.log(queryValues)} */}
          {queryValues.results.map((element, id) => {
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
