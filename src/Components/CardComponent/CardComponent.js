import React from "react";
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

export default function CardComponent(props) {
  const {
    element,
    id,
    iconCategory,
    distanceText,
    isItemFav,
    setIsItemFav,
    handleClickOpen,
  } = props;

  return (
    <Card sx={{ maxWidth: 345 }} key={id}>
      <CardHeader
        avatar={<Avatar src={iconCategory}></Avatar>}
        title={element.name}
        subheader={element.categories[0].name}
      />
      {/* {console.log("element:", props.element.pictureLinks)} */}
      {element && element.pictureLinks ? (
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
          <Avatar src={iconCategory}></Avatar>
          <Typography variant="body2" color="text.secondary">
            {distanceText}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        {isItemFav ? (
          <IconButton
            aria-label="take from favorites"
            onClick={() => setIsItemFav(false)}
          >
            <FavoriteIcon color="error" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => setIsItemFav(true)}
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
