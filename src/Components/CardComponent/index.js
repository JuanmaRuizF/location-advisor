import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import DetailsCardComponent from "./DetailsCardComponent";

export default function InfoCard(props) {
  const [element] = useState(props.element);
  const isFavPage = props.isFavPage;
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  const [distanceText, setDistanceText] = useState(0);
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
    //checks if there are these values, sometimes they are not provided. If they are not provided, set the value to an explanatory string
    const detailVerification = () => {
      if (element.website) {
        setWebsite(element.website);
      } else {
        setWebsite("No website provided.");
      }

      if (element.tel) {
        setTel(element.tel);
      } else {
        setTel("No telephone provided.");
      }

      if (element.hours_popular) {
        setHasPopularHours(true);
        setPopularHours(element.hours_popular);
      }
    };

    if (!isFavPage) {
      //get place details api doesn't return distance (error) so to avoid this, check it
      setDistanceText("Distance: " + element.distance.toString() + "m");
    }

    detailVerification();
    setLoaded(true); //when everything is loaded, set loaded hook to true to display data.
  }, []);

  return (
    <div>
      {loaded ? (
        <>
          {/* this is the card as such */}
          <CardComponent
            element={element}
            id={props.id}
            iconCategory={iconCategory}
            distanceText={distanceText}
            handleClickOpen={handleClickOpen}
            setNumberFavs={props.setNumberFavs}
            isFavPage={isFavPage}
          ></CardComponent>

          {/* this is the details modal which appears when the user opens the element  */}
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
      ) : null}
    </div>
  );
}
