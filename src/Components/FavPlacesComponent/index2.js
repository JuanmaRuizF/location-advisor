import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material/";
import { options } from "../../utils";
import InfoCard from "../CardComponent";

export default function FavPlaces() {
  const [queryValues, setQueryValues] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [numberFavs, setNumberFavs] = useState(0);
  // let items = [];

  useEffect(() => {
    if (!localStorage.favElements) {
      setNumberFavs(0);
      localStorage.setItem("favElements", JSON.stringify({}));
    } else {
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
    }
  }, []);

  useEffect(() => {
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

    const fetchData = async (fsq_id) => {
      var url = "https://api.foursquare.com/v3/places/" + fsq_id;
      var arrayResults;

      await fetch(url, options)
        .then((response) => response.json())
        .then(async (response) => {
          response.pictureLinks = await fetchPictures(response);
          arrayResults = response;
        })
        .catch((err) => console.error(err));

      return arrayResults;
    };

    let favItems = Object.keys(JSON.parse(localStorage.favElements));
    let items = [];

    favItems.map(async (fsq_id) => {
      items.push(await fetchData(fsq_id));
    });

    setQueryValues(items);
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [queryValues]);

  if (loaded) {
    return (
      <Container>
        <h1>Favourite places</h1>
        <Link to="/">TO MAIN PAGE</Link>
        {/* {queryValues.map((e) => {
          console.log(e);
        })} */}
        {console.log(queryValues)}

        {/* {console.log(queryValues)} */}
        {/* {console.log(queryValues)} */}
        {/* <div className="resultGrid">
          {queryValues.map((e) => {
            return <div>{console.log(e)}</div>;
          })}
        </div> */}
      </Container>
    );
  } else {
    return (
      <Container>
        <h3>Loading...</h3>
      </Container>
    );
  }
}
//  {queryValues ? (
//             <div>
//               {queryValues.map((element, id) => {
//                 return (
//                   <InfoCard
//                     key={id}
//                     element={element}
//                     id={id}
//                     setNumberFavs={setNumberFavs}
//                   ></InfoCard>
//                 );
//               })}
//             </div>
//           ) : (
//             <div></div>
//           )}
