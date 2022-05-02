import React, { useState } from "react";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Avatar,
  ToggleButton,
  TextField,
} from "@mui/material/";
import { useMapEvent } from "react-leaflet/hooks";

export default function MapCoordinatesComponent(props) {
  const { latlong, setLatlong } = props;
  const [open, setOpen] = useState(false);
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
      setLatlong(str);
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
        <MapOutlinedIcon fontSize="large" />
      </ToggleButton>

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
              //   pl: 1,
              //   pb: 1,
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
          </MapContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
