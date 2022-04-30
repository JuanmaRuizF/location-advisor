import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardComponent(props) {
  const {
    element,
    id,
    iconCategory,
    distanceText,

    // isItemFav,
    // setIsItemFav,
    handleClickOpen,
    setNumberFavs,
    isFavPage,
  } = props;

  const [isItemFav, setIsItemFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let favItems = JSON.parse(localStorage.favElements);
    if (element.fsq_id in favItems) {
      setIsItemFav(true);
    }
  }, []);

  useEffect(() => {});
  const handleFav = () => {
    //as the useState will be updated later, we have to treat them inverselly ->
    // the functionality for adding to fav will be in the condition if it is still false

    if (isItemFav) {
      setIsItemFav(false);
      let favItems = JSON.parse(localStorage.favElements);
      delete favItems[element.fsq_id];
      localStorage.setItem("favElements", JSON.stringify(favItems));
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
      if (isFavPage) {
        navigate(0);
      }
    } else {
      setIsItemFav(true);
      let favItems = JSON.parse(localStorage.favElements);
      favItems[element.fsq_id] = element.fsq_id;
      localStorage.setItem("favElements", JSON.stringify(favItems));
      setNumberFavs(Object.keys(JSON.parse(localStorage.favElements)).length);
      if (isFavPage) {
        navigate(0);
      }
    }
    // console.log(localStorage.getItem("favElements"));
  };

  return (
    <Card sx={{ maxWidth: 345 }} key={id}>
      <CardHeader
        avatar={<Avatar src={iconCategory}></Avatar>}
        title={element.name}
        subheader={element.categories[0].name}
      />
      {element && element.pictureLinks ? ( //checks if there are pictures, just in case they are not provided
        <CardMedia
          component="img"
          height="200"
          image={element.pictureLinks[0]}
          src={element.pictureLinks[0]}
          alt={element.name}
        />
      ) : (
        <div></div>
      )}

      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
          }}
        >
          {!isFavPage ? (
            <Typography variant="body2" color="text.secondary">
              {distanceText}
            </Typography>
          ) : null}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {isItemFav ? (
          <IconButton
            aria-label="take from favorites"
            onClick={() => {
              handleFav();
            }}
          >
            <FavoriteIcon color="error" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              handleFav();
            }}
          >
            <FavoriteIcon />
          </IconButton>
        )}

        <IconButton aria-label="details" onClick={handleClickOpen}>
          <InfoIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
