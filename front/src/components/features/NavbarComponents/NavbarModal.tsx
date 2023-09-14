import React from "react";
import "./styles/NavbarModal.css";
import Box from "../../common/Box";
import { isModalOpen } from "../../../types/index";
import { SlideSpan } from "../../common/SlideSpan";
const NavbarModal: React.FC<isModalOpen> = ({ isNavbarModalOpen, onClose }) => {
  return (
    <Box position="absolute" width={80} height={70} left={0} top={15}>
      <div className="navbar-gallery">
        {/* <SlideSpan
          fontSize="2.5rem"
          margin="1%"
          speed={5}
          fontFamily="PartialSansKR-Regular"
        >
          GALLERY
        </SlideSpan>
        <SlideSpan
          fontSize="2.5rem"
          margin="1%"
          speed={5}
          fontFamily="omyu_pretty"
        >
          GALLERY
        </SlideSpan>
        <SlideSpan
          fontSize="2.5rem"
          margin="1%"
          speed={5}
          fontFamily="IAMAPLAYER"
        >
          GALLERY
        </SlideSpan>
        <SlideSpan
          fontSize="2.5rem"
          margin="1%"
          speed={5}
          fontFamily="OKDDUNG"
        >
          GALLERY
        </SlideSpan> */}
      </div>
    </Box>
  );
};

export default NavbarModal;
