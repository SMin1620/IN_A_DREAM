// MouseCursor.tsx
import React from "react";
import useMousePosition from "../../../hooks/useMousPosition";
import "./MouseCursor.css";

const MouseCursor = () => {
  const { x, y } = useMousePosition();

  return (
    <div className="mouse-cursor" style={{ left: `${x}px`, top: `${y}px` }} />
  );
};

export default MouseCursor;
