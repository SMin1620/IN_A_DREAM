import { useEffect } from "react";
import clImage from "../assets/background/CLcloud.jpg";
import Cloud from "../components/features/CloudComponents/Cloud";

interface CloudProps {
  children?: React.ReactNode;
}

function Overlay({ children }: CloudProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${clImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "50vw 75vh",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "200vw",
        height: "150vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function CloudPage() {
  useEffect(() => {
    // 페이지가 로드되면 뷰포트 중앙으로 스크롤
    const centerOfWidth =
      document.documentElement.scrollWidth / 2 - window.innerWidth / 2;
    const centerOfHeight =
      document.documentElement.scrollHeight / 2 - window.innerHeight / 2;
    window.scrollTo(centerOfWidth, centerOfHeight);
  }, []);

  return (
    <>
      <Overlay>
        <Cloud />
      </Overlay>
    </>
  );
}

export default CloudPage;
