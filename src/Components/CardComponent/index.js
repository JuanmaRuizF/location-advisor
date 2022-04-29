import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import DetailsCardComponent from "./DetailsCardComponent";
import { options } from "../../utils";

export default function InfoCard(props) {
  const [element] = useState(props.element);
  const [distanceText] = useState(
    "Distance: " + element.distance.toString() + "m"
  );
  const [loaded, setLoaded] = useState(false);

  const [open, setOpen] = useState(false);

  const [website, setWebsite] = useState("");
  const [tel, setTel] = useState("");
  const [popularHours, setPopularHours] = useState([]);
  const [hasPopularHours, setHasPopularHours] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let iconCategory =
    element.categories[0].icon.prefix +
    "bg_32" +
    element.categories[0].icon.suffix;

  useEffect(() => {
    const fetchDetails = async () => {
      var url =
        "https://api.foursquare.com/v3/places/" +
        element.fsq_id +
        "?fields=tel,website,hours_popular";
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.website) {
            setWebsite(response.website);
          } else {
            setWebsite("No website provided.");
          }

          if (response.tel) {
            setTel(response.tel);
          } else {
            setTel("No telephone provided.");
          }

          if (response.hours_popular) {
            setHasPopularHours(true);
            setPopularHours(response.hours_popular);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchDetails();
    setLoaded(true);
  }, []);

  return (
    <div>
      {loaded ? (
        <>
          <CardComponent
            element={element}
            id={props.id}
            iconCategory={iconCategory}
            distanceText={distanceText}
            // isItemFav={isItemFav}
            // setIsItemFav={setIsItemFav}
            handleClickOpen={handleClickOpen}
            setNumberFavs={props.setNumberFavs}
          ></CardComponent>

          <DetailsCardComponent
            open={open}
            handleClose={handleClose}
            iconCategory={iconCategory}
            element={element}
            website={website}
            tel={tel}
            hasPopularHours={hasPopularHours}
            popularHours={popularHours}
          ></DetailsCardComponent>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
