import * as THREE from "three";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { useDrag, useWheel } from "@use-gesture/react";
import { createGlobalStyle } from "styled-components";
import { useTexture, Plane } from "@react-three/drei";
import imgB from "../../../assets/background/background1.png";

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  overflow-y: hidden; // 좌우 스크롤을 숨깁니다.
}
`;

const NUM_IMAGES = 50; // 원하는 이미지 개수
const MAX_POSITION = 3; // 이미지가 배치될 수 있는 최대 위치
const MAX_POSITION_WIDTH = 150;
const MAX_POSITION_HEIGHT = 80;

export default function Cloud() {
  const [dragStyle, setDrag] = useSpring(() => ({ x: 0, y: 0 }));
  const [scrollStyle, setScroll] = useSpring(() => ({ x: 0, y: 0 }));

  const bindDrag = useDrag(({ offset: [ox, oy], down }) => {
    if (down) {
      setDrag({ x: ox, y: oy });
    }
  });

  const bindWheel = useWheel(({ offset: [dx, dy] }) => {
    setScroll({ x: dx, y: dy });
  });

  return (
    <div
      {...bindDrag()}
      {...bindWheel()}
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
          position: [0, 0, 20],
        }}
      >
        <DraggableCameraControls
          dragStyle={dragStyle}
          scrollStyle={scrollStyle}
        />

        <ambientLight intensity={0.5} />
        <ImageTexture position={[0, 0, -2]} />
        <ImageTexture position={[5, 5, 0]} />
        <Suspense fallback={null}>
          {Array.from({ length: NUM_IMAGES }).map((_, index) => (
            <RandomClouds key={index} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

function DraggableCameraControls({ dragStyle, scrollStyle }) {
  const { camera } = useThree();

  useFrame(() => {
    const scale = 50;
    camera.position.x = -(dragStyle.x.get() - scrollStyle.x.get()) / scale;
    camera.position.y = (dragStyle.y.get() - scrollStyle.y.get()) / scale;
  });

  return null;
}

function ImageTexture(props) {
  const texture = useTexture(imgB);
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  const [x, y, z] = props.position || [0, 0, 0];
  const hoveredZ = 4;

  const springProps = useSpring({
    scale: clicked ? [1.5, 1.5, 1.5] : [1, 1, 1],
    position: hovered ? [x, y, hoveredZ] : [x, y, z],
  });

  return (
    <a.mesh
      {...props}
      {...springProps}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <Plane args={[5, 5]} material-map={texture} />
    </a.mesh>
  );
}

function RandomClouds() {
  const texture = useLoader(THREE.TextureLoader, "/cloud.png");
  // 랜덤한 위치 및 크기 생성
  const randomX = (Math.random() - 0.5) * MAX_POSITION_WIDTH;
  const randomY = (Math.random() - 0.5) * MAX_POSITION_HEIGHT;
  const randomZ = -Math.random() * 2 * MAX_POSITION;
  const randomScale = 0.5 + Math.random() * 1.5; // 0.5에서 2 사이의 랜덤한 크기

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight color={0xffffff} intensity={1.0} position={[0, 0, 1]} />

      <mesh
        position={[randomX, randomY, randomZ]}
        scale={[randomScale, randomScale, randomScale]}
      >
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent={true}
        />
      </mesh>
    </>
  );
}
