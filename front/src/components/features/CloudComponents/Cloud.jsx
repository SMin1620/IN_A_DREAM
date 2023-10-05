import * as THREE from "three";
import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { useDrag, useWheel } from "@use-gesture/react";
import { createGlobalStyle } from "styled-components";
import { useTexture, Plane, Html } from "@react-three/drei";

const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden; // 좌우 스크롤을 숨깁니다.
  overflow-y: hidden; // 좌우 스크롤을 숨깁니다.
}
`;

// imageGallery 페이지 참고

const NUM_IMAGES = 50; // 원하는 이미지 개수
const MAX_POSITION = 3; // 이미지가 배치될 수 있는 최대 z위치
const MAX_POSITION_WIDTH = 105; // 높이 * 1.618 황금비
const MAX_POSITION_HEIGHT = 65;

export default function Cloud({ images }) {
  const [dragStyle, setDrag] = useSpring(() => ({ x: 0, y: 0 }));
  const [scrollStyle, setScroll] = useSpring(() => ({ x: 0, y: 0 }));

  const [clickedIndex, setClickedIndex] = useState(null);

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
        zIndex: 1,
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
        {/* <MapControls screenSpacePanning enableZoom={false} /> */}
        {/* <Stats /> */}
        <DraggableCameraControls
          dragStyle={dragStyle}
          scrollStyle={scrollStyle}
        />

        <ambientLight intensity={0.5} />
        {images.map((image, idx) => (
          <ImageTexture
            key={idx}
            index={idx}
            position={image.position}
            url={image.url}
            nickname={image.nickname}
            content={image.content}
            title={image.title}
            clickedIndex={clickedIndex}
            setClickedIndex={setClickedIndex}
          />
        ))}
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

    // console.log(
    //   `Camera Position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`,
    // );
  });

  return null;
}

function ImageTexture(props) {
  const { camera } = useThree();

  const texture = useTexture(props.url);
  // const texture = new THREE.TextureLoader().load(props.url);
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [position, setPosition] = useState(() => {
    const randomX = (Math.random() - 0.5) * MAX_POSITION_WIDTH;
    const randomY = (Math.random() - 0.5) * MAX_POSITION_HEIGHT;
    const randomZ = (Math.random() - 0.5) * 2 * MAX_POSITION;
    return [randomX, randomY, randomZ];
  });

  useEffect(() => {
    // `props.url`이 변경되면 `position` 상태를 업데이트합니다.
    const randomX = (Math.random() - 0.5) * MAX_POSITION_WIDTH;
    const randomY = (Math.random() - 0.5) * MAX_POSITION_HEIGHT;
    const randomZ = (Math.random() - 0.5) * 2 * MAX_POSITION;
    setPosition([randomX, randomY, randomZ]);
  }, [props.url]);

  // const [x, y, z] = props.position || [0, 0, 0];
  const [x, y, z] = position;

  const hoveredZ = 3.01;

  // const springProps = useSpring({
  //   scale: hovered || clicked ? [1.5, 1.5, 1.5] : [1, 1, 1],
  //   // position: hovered || clicked ? [x, y, hoveredZ] : [x, y, z],
  //   position: clicked
  //     ? [camera.position.x, camera.position.y, hoveredZ]
  //     : [x, y, z],
  // });

  const springProps = useSpring({
    scale: props.index === props.clickedIndex ? [1.5, 1.5, 1.5] : [1, 1, 1],

    position:
      props.index === props.clickedIndex
        ? [camera.position.x - 5, camera.position.y, hoveredZ]
        : [x, y, hovered ? hoveredZ : z], // clicked가 아닌 경우에는 원래 랜덤한 위치를 사용
  });

  return (
    <a.mesh
      {...props}
      {...springProps}
      ref={ref}
      onClick={(event) => {
        if (props.index !== props.clickedIndex) {
          props.setClickedIndex(props.index); // 현재 컴포넌트가 클릭되면 해당 인덱스 정보를 저장합니다.
        } else {
          props.setClickedIndex(null);
        }
      }}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      {props.index === props.clickedIndex && (
        <Html
          position={[3, 2.6, 0]}
          // onOcclude={set}
          style={{
            color: "black",
            position: "relative",
            right: "0",
            bottom: "0",
            fontFamily: "Pretendard Variable",
            textAlign: "left",
            whiteSpace: "pre-wrap",
            width: "400px",
            overflowWrap: "break-word",
            pointerEvents: "none",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "5%",
            fontWeight: "bold",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              fontSize: "1.3rem",
              // fontWeight: "bold",
              marginBottom: "10%",
            }}
          >
            {props.title}
          </div>
          <div style={{ letterSpacing: "1px", lineHeight: "1.3rem" }}>
            {props.content}
          </div>
          <div style={{ fontSize: "0.8rem", marginTop: "10%" }}>
            작성자 : {props.nickname}
          </div>
        </Html>
      )}

      <Plane args={[5, 5]} material-map={texture} />
    </a.mesh>
  );
}

function RandomClouds() {
  const texture = useLoader(THREE.TextureLoader, "/cloud.png");
  // 랜덤한 위치 및 크기 생성

  const [scale, setScale] = useState(() => {
    const randomScale = 0.5 + Math.random() * 1.5; // 0.5에서 2 사이의 랜덤한 크기
    return [randomScale];
  });

  const [position, setPosition] = useState(() => {
    const randomX = (Math.random() - 0.5) * MAX_POSITION_WIDTH;
    const randomY = (Math.random() - 0.5) * MAX_POSITION_HEIGHT;
    const randomZ = -Math.random() * MAX_POSITION + 0.9;
    return [randomX, randomY, randomZ];
  });
  //  나중에 클릭이벤트 확인불필요할때 적자
  // // const [x, y, z] = props.position || [0, 0, 0];
  const [x, y, z] = position;

  return (
    <>
      <ambientLight color={0xffffff} intensity={1} />
      <directionalLight color={0xffffff} intensity={1.0} position={[0, 0, 1]} />

      <mesh position={[x, y, z]} scale={[scale, scale, scale]}>
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
