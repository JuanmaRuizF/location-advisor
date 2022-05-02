import React, { useState } from "react";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  ToggleButton,
  TextField,
} from "@mui/material/";
import { useMapEvent } from "react-leaflet/hooks";

export default function MapCoordinatesComponent(props) {
  const { latlong, setLatlong } = props;
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  function OnClickCoordinates() {
    const dec = 10000;
    useMapEvent("click", (e) => {
      let str =
        Math.round(e.latlng.lat * dec) / dec +
        "," +
        Math.round(e.latlng.lng * dec) / dec;
      setLatlong(str); //string with the latlng selected, rounded up to 4 decimal places
      setLatitude(e.latlng.lat); //these 2 variables will be used to display the marker where the user clicks. Mantains all the decimal places to be completely precise
      setLongitude(e.latlng.lng);
    });
  }

  return (
    <>
      <TextField
        disabled
        id="outlined-disabled"
        label="Selected coordiantes"
        value={"[" + latlong + "]"}
      />
      <ToggleButton
        value="left"
        aria-label="left aligned"
        onClick={() => {
          setOpen(true);
        }}
      >
        {/* this will open the map on the click event */}
        <MapOutlinedIcon fontSize="large" />
      </ToggleButton>

      {/* modal with the map */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Select Coordinates
          </Box>
        </DialogTitle>
        <DialogContent>Selected coordinates: {latlong}</DialogContent>

        <DialogContent>
          <MapContainer center={[41.86, 12.5]} zoom={15} scrollWheelZoom={true}>
            <OnClickCoordinates />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {latitude !== null && longitude !== null ? ( //if the user has selected some coordinates, it will be shown in the marker.
              <Marker position={[latitude, longitude]}></Marker>
            ) : null}
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
