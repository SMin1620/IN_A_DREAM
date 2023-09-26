// useMousePosition.ts
import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

const useMousePosition = (): Position => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.pageX, y: e.pageY });
    };

    document.addEventListener("mousemove", updatePosition);

    return () => document.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
};

export default useMousePosition;
