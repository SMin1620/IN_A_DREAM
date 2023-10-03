import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { createGlobalStyle } from "styled-components";
import { useTexture, Plane } from "@react-three/drei";

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  overflow-y: hidden; // 좌우 스크롤을 숨깁니다.
}
`;

const Clouds = () => {
  const { camera } = useThree(); // 카메라에 접근하기 위해 useThree 훅 사용
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "/cloud.png");
  const [start, setStart] = useState(Date.now());

  useEffect(() => {
    texture.magFilter = THREE.LinearMipMapLinearFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
  }, [texture]);

  useFrame(() => {
    if (camera) {
      let time = (Date.now() - start) * 0.005;
      camera.position.z -= time; // 카메라의 Z 위치를 변경하여 구름 속으로 이동하는 애니메이션 효과 생성
    }
  });

  let geometries = [];
  let planeGeometry = new THREE.PlaneGeometry(64, 64);

  for (var i = 0; i < 8000; i++) {
    let plane = planeGeometry.clone();
    plane.translate(Math.random() * 1000 - 500, Math.random() * 200 - 15, i);
    plane.rotateZ(Math.random() * Math.PI);
    plane.scale(
      Math.random() * Math.random() * 1.5 + 0.5,
      Math.random() * Math.random() * 1.5 + 0.5,
      1,
    );
    geometries.push(plane);
  }

  let mergedGeometry = mergeBufferGeometries(geometries);

  return (
    <>
      <mesh ref={meshRef} geometry={mergedGeometry}></mesh>
      <mesh ref={meshRef} geometry={mergedGeometry} position-z={-8000}></mesh>
    </>
  );
};

const CloudComponent = () => {
  return (
    <div
      style={{
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
          position: [0, 0, 8300],
        }}
      >
        <Clouds />
      </Canvas>
    </div>
  );
};

export default CloudComponent;
