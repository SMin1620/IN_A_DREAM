import React from "react";
import "./styles/NavbarModal.css";
import Box from "../../common/Box";
import { isModalOpen } from "../../../types/index";

const NavbarModal: React.FC<isModalOpen> = ({ isNavbarModalOpen, onClose }) => {
  return (
    <Box position="absolute" width={80} height={70} left={0} top={15}>
      NavbarModal
    </Box>
  );
};

export default NavbarModal;
