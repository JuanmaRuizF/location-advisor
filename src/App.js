import { useState, useEffect } from "react";
import "./Styles/App.css";
import { Link } from "react-router-dom";
import { Container, Badge, Grid, CircularProgress } from "@mui/material/";
import InfoCard from "./Components/CardComponent";
import { options } from "./utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UserInputComponent from "./Components/UserInputComponent";

function App() {
  const [queryValues, setQueryValues] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [fetchUrl, setFetchUrl] = useState(
    "https://api.foursquare.com/v3/places/search?radius=100000&ll=27.983375,-15.691567&limit=10&fields=photos,categories,name,geocodes,location,distance,tel,website,hours_popular,fsq_id"
  );
  const [numberFavs, setNumberFavs] = useState(0);

  useEffect(() => {
    if (!localStorage.favElements) {
      setNumberFavs(0);
      localStorage.setItem("favElements", JSON.stringify({}));
    } else {
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
    }
  }, []);

  const fetchData = async () => {
    await fetch(fetchUrl, options)
      .then((response) => response.json())
      .then((response) => {
        let editedResponse = response.results;

        editedResponse.map((element) => {
          let res = [];
          element["photos"].map((img) => {
            res.push(img.prefix + "200x200" + img.suffix);
          });
          element.photos = res;
        });
        return editedResponse;
      })
      .then((response) => {
        console.log(response);
        setQueryValues(response);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setLoaded(false);
    fetchData();
  }, [fetchUrl]);

  console.log(queryValues);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1>Location Advisor</h1>
        </Grid>
        <Grid item xs={6}>
          <Link to="/favourite">
            <h1 className="favButton">
              <Badge badgeContent={numberFavs} color="primary">
                <FavoriteIcon color="error" sx={{ fontSize: 35 }} />
              </Badge>
            </h1>
          </Link>
        </Grid>
      </Grid>
      <hr className="separatingBar"></hr>
      <UserInputComponent
        fetchUrl={fetchUrl}
        setFetchUrl={setFetchUrl}
      ></UserInputComponent>
      <hr></hr>
      {loaded ? (
        <div className="resultGrid">
          {loaded
            ? queryValues.map((element, id) => {
                // console.log(queryValues);
                return (
                  <InfoCard
                    key={id}
                    element={element}
                    id={id}
                    setNumberFavs={setNumberFavs}
                  ></InfoCard>
                );
                // console.log(element.pictureLinks);
              })
            : null}
        </div>
      ) : (
        <div className="loadingComponent">
          <CircularProgress size="8rem" />
        </div>
      )}
    </Container>
  );
}

export default App;
