import React from "react";
import { ImageList, ImageListItem } from "@mui/material/";

export default function ImageListCardComponent(props) {
  const element = props.element;
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {element.map((item, id) => (
        <ImageListItem key={id}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={id}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
