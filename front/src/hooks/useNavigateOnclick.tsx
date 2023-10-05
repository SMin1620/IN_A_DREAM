import { useNavigate } from "react-router-dom";

const useNavigateOnClick = (path: string) => {
  const navigate = useNavigate();

  return () => {
    navigate(path);
  };
};

export default useNavigateOnClick;
