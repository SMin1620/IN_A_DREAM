import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
// import { mergeBufferGeometries } from "three-stdlib";
import { createGlobalStyle } from "styled-components";
// import { useTexture, Plane } from "@react-three/drei";

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  overflow-y: hidden; // 좌우 스크롤을 숨깁니다.
}
`;

const CloudMesh = ({ position }) => {
  const mesh = useRef();
  // useFrame(() => (mesh.current.rotation.z += 0.001));
  const texture = useLoader(THREE.TextureLoader, "/cloud.png");

  const [scale, setScale] = useState(() => {
    const randomScale = 0.15 + Math.random() * 0.35; // 0.15에서 0.5 사이의 랜덤한 크기
    return [randomScale];
  });
  // 직접 필터 속성 설정 GPU 메모리를 절약
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <mesh ref={mesh} position={position} scale={[scale, scale, scale]}>
        <planeGeometry attach="geometry" args={[48, 48]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent={true}
        />
      </mesh>
    </>
  );
};

const Clouds = () => {
  const { camera } = useThree();
  const clouds = useMemo(() => {
    const temp = [];
    for (let i = 875; i < 1000; i++) {
      const x1 = (Math.random() - 0.5) * 2 * 50;
      const x2 = (Math.random() - 0.5) * 2 * 50;
      const y1 = (Math.random() - 0.5) * 2 * 50;
      const y2 = (Math.random() - 0.5) * 2 * 50;
      const z = i;
      temp.push(<CloudMesh key={i} position={[x1, y1, z]} />);
      temp.push(<CloudMesh key={i} position={[x2, y2, z]} />);
    }
    return temp;
  }, []);

  useFrame(() => {
    camera.position.z -= 0.25;
  });

  return <>{clouds}</>;
};

// const Lighting = () => (
//   <>
//     <ambientLight intensity={1} />
//   </>
// );

const CloudComponent = () => {
  return (
    <div
      style={{
        zIndex: 2,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <GlobalStyle />

      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{
          position: [0, 0, 1000],
        }}
      >
        <Clouds />
        {/* <Lighting /> */}
      </Canvas>
    </div>
  );
};

export default CloudComponent;
