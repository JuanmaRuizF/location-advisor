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
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
// import DetailsModal from "./DetailsModal";

export default function InfoCard(props) {
  var element = props.element;
  var id = props.id;
  const dates = [
    "",
    "Monday: ",
    "Tuesday: ",
    "Wednesday: ",
    "Thursday: ",
    "Friday: ",
    "Saturday: ",
    "Sunday: ",
  ];

  const [isItemFav, setIsItemFav] = useState(false);
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
  console.log(element);
  let distanceText = "Distance: " + element["distance"].toString() + "m";

  let iconCategory =
    element["categories"][0]["icon"]["prefix"] +
    "bg_32" +
    element["categories"][0]["icon"]["suffix"];

  useEffect(() => {
    const fetchDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "fsq3i9kwIT71lD8Ta2qgw60a7bCxO/9nNrw9fCapnuSFRoU=",
        },
      };
      var url =
        "https://api.foursquare.com/v3/places/" +
        element["fsq_id"] +
        "?fields=tel,website,hours_popular";
      await fetch(url, options)
        .then((response) => response.json())
        .then((response) => {
          //   console.log(response);
          if (response["website"]) {
            setWebsite(response["website"]);
          } else {
            setWebsite("No website provided.");
          }

          if (response["tel"]) {
            setTel(response["tel"]);
          } else {
            setTel("No telephone provided.");
          }

          if (response["hours_popular"]) {
            setHasPopularHours(true);
            setPopularHours(response["hours_popular"]);
          }
        })
        .catch((err) => console.error(err));
    };
    fetchDetails();
  }, []);

  return (
    <>
      <Card sx={{ maxWidth: 345 }} key={id}>
        <CardHeader
          avatar={<Avatar src={iconCategory}></Avatar>}
          title={element["name"]}
          subheader={element["categories"][0]["name"]}
        />
        <CardMedia
          component="img"
          height="200"
          image={element["pictureLinks"][0]}
          src={element["pictureLinks"][0]}
          alt={element["name"]}
        />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            {/* <Avatar src={iconCategory}></Avatar> */}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <Avatar src={iconCategory}></Avatar>

            {element["name"]}
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Category: {element["categories"][0]["name"]}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Address: {element["location"]["formatted_address"]},
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Website: {website}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Telephone: {tel}
          </DialogContentText>
          <div>
            Most visited hours:
            {hasPopularHours ? (
              <div>
                {popularHours.map((element, id) => {
                  return (
                    <div key={id}>
                      {dates[element["day"]]}
                      {element["open"].substring(
                        0,
                        element["open"].length - 2
                      )}{" "}
                      -{" "}
                      {element["close"].substring(
                        0,
                        element["close"].length - 2
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>Not provided.</div>
            )}
          </div>

          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {element["pictureLinks"].map((item, id) => (
              <ImageListItem key={id}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={id}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <div>
            <MapContainer
              center={[
                element["geocodes"]["main"]["latitude"],
                element["geocodes"]["main"]["longitude"],
              ]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  element["geocodes"]["main"]["latitude"],
                  element["geocodes"]["main"]["longitude"],
                ]}
              >
                <Popup>{element["name"]}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
