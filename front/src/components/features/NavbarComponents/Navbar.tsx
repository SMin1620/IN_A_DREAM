import React, { useState } from "react";
import "./styles/Navbar.css";
import NavbarBody from "./NavbarBody";
import NavbarModal from "./NavbarModal";
import NavbarMyModal from "./NavbarMyModal";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const [isNavbarModalOpen, setIsNavbarModalOpen] = useState<boolean>(false);
  const [isMyModalOpen, setIsMyModalOpen] = useState<boolean>(false);

  const isMobileView = useMediaQuery({
    query: "(max-width: 768px)",
  });
  return (
    <div className="navbar-wrapper">
      {isMobileView ? (
        <button
          className="hamburger-menu"
          onClick={() => setIsNavbarModalOpen(!isNavbarModalOpen)}
        >
          &#9776; {/* Unicode for hamburger icon */}
        </button>
      ) : (
        <NavbarBody
          setIsNavbarModalOpen={setIsNavbarModalOpen}
          setIsMyModalOpen={setIsMyModalOpen}
        />
      )}

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
