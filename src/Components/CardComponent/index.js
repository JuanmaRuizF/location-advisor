import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import DetailsCardComponent from "./DetailsCardComponent";
import { options } from "../../utils";

export default function InfoCard(props) {
  const [element] = useState(props.element);
  const isFavPage = props.isFavPage;
  const [distanceText, setDistanceText] = useState(0);

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
      setDistanceText("Distance: " + element.distance.toString() + "m");
    }

    detailVerification();
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
            handleClickOpen={handleClickOpen}
            setNumberFavs={props.setNumberFavs}
            isFavPage={isFavPage}
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
