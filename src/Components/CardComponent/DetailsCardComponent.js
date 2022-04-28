import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Avatar,
} from "@mui/material/";

import MapCardComponent from "./MapCardComponent";
import ImageListCardComponent from "./ImageListCardComponent";

export default function DetailsCardComponent(props) {
  const {
    open,
    handleClose,
    iconCategory,
    element,
    website,
    tel,
    hasPopularHours,
    popularHours,
  } = props;

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
  return (
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

          {element.name}
        </Box>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Category: {element.categories[0].name}
        </DialogContentText>
        <DialogContentText id="alert-dialog-description">
          Address: {element.location.formatted_address},
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
                    {element.open.substring(0, element.open.length - 2)} -{" "}
                    {element.close.substring(0, element.close.length - 2)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Not provided.</div>
          )}
        </div>

        {element && element.pictureLinks ? (
          <ImageListCardComponent element={element}></ImageListCardComponent>
        ) : (
          <div></div>
        )}
        <div>
          <MapCardComponent element={element}></MapCardComponent>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
