import { useState, useEffect } from "react";
import "./Styles/App.css";
import { Link } from "react-router-dom";
import { Container, Badge } from "@mui/material/";
import Slider from "./Components/UserInputComponent/SliderComponent";
import FavPlaces from "./Components/FavPlacesComponent";
import InfoCard from "./Components/CardComponent";
import { options } from "./utils";
import FavoriteIcon from "@mui/icons-material/Favorite";

function App() {
  const [queryValues, setQueryValues] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [numberFavs, setNumberFavs] = useState(0);
  const [valueDistance, setValueDistance] = useState(50);

  const urlCreation = () => {
    // var url =
    //   "https://api.foursquare.com/v3/places/search?ll=45.433633,9.208001&radius=100000&limit=25&sort=distance";
    var url =
      "https://api.foursquare.com/v3/places/search?radius=100000&limit=25&ll=42.433633,9.208001";

    return url;
  };

  useEffect(() => {
    if (!localStorage.favElements) {
      setNumberFavs(0);
      localStorage.setItem("favElements", JSON.stringify({}));
    } else {
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
    }
  }, []);

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
    return pictures;
  };

  const fetchData = async () => {
    await fetch(urlCreation(), options)
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

  return (
    <Container>
      <h1>Location Advisor</h1>

      <Link to="/favourite">
        <Badge badgeContent={numberFavs} color="primary">
          <FavoriteIcon color="error" sx={{ fontSize: 35 }} />
        </Badge>
      </Link>
      <button
        onClick={async () => {
          await fetchData().then(() => {
            setLoaded(true);
          });
        }}
      >
        Cargar
      </button>

      <Slider
        valueDistance={valueDistance}
        setValueDistance={setValueDistance}
      ></Slider>
      <hr></hr>
      {loaded ? (
        <div className="resultGrid">
          {/* {console.log(queryValues)} */}
          {queryValues.results.map((element, id) => {
            return (
              <InfoCard
                key={id}
                element={element}
                id={id}
                setNumberFavs={setNumberFavs}
              ></InfoCard>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default App;
