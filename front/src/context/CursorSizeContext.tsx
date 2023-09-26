import React from "react";

type CursorSizeContextType = {
  cursorSize: string;
  setCursorSize: React.Dispatch<React.SetStateAction<string>>;
};

const CursorSizeContext = React.createContext<CursorSizeContextType>({
  cursorSize: "3vw",
  setCursorSize: () => {},
});

export const CursorSizeProvider = CursorSizeContext.Provider;
export const CursorSizeConsumer = CursorSizeContext.Consumer;

export default CursorSizeContext;
