import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

interface Item {
  img: string;
  title: string;
}

interface Props {
  itemData: Item[];
}

const ImgScrollCardBox: React.FC<Props> = ({ itemData }) => {
  return (
    <Box sx={{ width: "80%", height: 450, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={15}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default ImgScrollCardBox;
