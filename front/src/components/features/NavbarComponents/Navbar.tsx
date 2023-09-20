import React, { useState } from "react";
import "./styles/Navbar.css";
import NavbarBody from "./NavbarBody";
import NavbarModal from "./NavbarModal";
import NavbarMyModal from "./NavbarMyModal";

const Navbar = () => {
  const [isNavbarModalOpen, setIsNavbarModalOpen] = useState<boolean>(false);
  const [isMyModalOpen, setIsMyModalOpen] = useState<boolean>(false);

  return (
    <div className="navbar-wrapper">
      <NavbarBody
        setIsNavbarModalOpen={setIsNavbarModalOpen}
        setIsMyModalOpen={setIsMyModalOpen}
      />

      {isNavbarModalOpen && (
        <NavbarModal
          isNavbarModalOpen={isNavbarModalOpen}
          onClose={() => setIsNavbarModalOpen(false)}
        />
      )}
      {isMyModalOpen && (
        <NavbarMyModal
          isNavbarModalOpen={isMyModalOpen}
          onClose={() => setIsMyModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
