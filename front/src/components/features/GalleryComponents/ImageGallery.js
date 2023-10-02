import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Html,
} from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";

const GalleryName = {
  neutralPoint: "SOSO GALLERY",
  positivePoint: "HAPPY GALLERY",
  negativePoint: "SAD GALLERY",
};

const GOLDENRATIO = 1.61803398875;

export const ImageGallery = ({ images, sortKey }) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={["#191920"]} />
    <fog attach="fog" args={["#191920", 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} sortKey={sortKey} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
);

function Frames({
  images,
  sortKey,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute(`/gallery/${sortKey}/item/:id`);
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object
            ? `/gallery/${sortKey}`
            : `/gallery/${sortKey}/item/` + e.object.name
        )
      )}
      onPointerMissed={() => setLocation(`/gallery/${sortKey}`)}
    >
      <Html
        position={[-1, 3.3, 0]}
        style={{
          color: "#C3BAA5",
          fontFamily: "GoryeongStrawberry",
          fontSize: "2.2rem",
          whiteSpace: "pre-wrap",
          width: "auto",
          overflowWrap: "break-word",
          pointerEvents: "none",
        }}
      >
        {GalleryName[sortKey]}
        {/* {sortKey} */}
      </Html>
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({
  url,
  title,
  content,
  nickname,
  c = new THREE.Color(),
  ...props
}) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute("/gallery/:sortKey/item/:id");
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  // const [hidden, set] = useState();

  useCursor(hovered);
  useFrame((state, dt) => {
    image.current.material.zoom = 1;
    // image.current.material.zoom =
    //   2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    // easing.damp3(
    //   image.current.scale,
    //   [
    //     0.85 * (!isActive && hovered ? 0.85 : 1),
    //     0.9 * (!isActive && hovered ? 0.905 : 1),
    //     1,
    //   ],
    //   0.1,
    //   dt
    // );
    easing.damp3(
      image.current.scale,
      [
        !isActive && hovered ? 1 : 1,
        !isActive && hovered ? 1 : 1,
        image.current.scale.z, // z 축 방향(깊이) 스케일은 원래대로 유지
      ],
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "black" : "white",
      0.1,
      dt
    );
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        // scale={[1, GOLDENRATIO, 0.05]}
        scale={[1, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>

      {/* <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.025}
      > */}
      <Html
        position={[0.55, 1.3, 0]}
        // onOcclude={set}
        style={{
          color: "white",
          position: "relative",
          right: "0",
          bottom: "0",
          opacity: isActive ? 1 : 0,
          fontFamily: "OTWelcomeRA",
          textAlign: "left",
          fontSize: "1.5rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "180px",
          overflowWrap: "break-word",
          lineHeight: "2rem",
          pointerEvents: "none",
        }}
      >
        {title}
      </Html>

      <Html
        position={[0.55, 1.1, 0]}
        // onOcclude={set}
        style={{
          color: "white",
          position: "relative",
          right: "0",
          bottom: "0",
          opacity: isActive ? 1 : 0,
          fontFamily: "OTWelcomeRA",
          textAlign: "left",
          fontWeight: "lighter",
          whiteSpace: "pre-wrap",
          width: "180px",
          overflowWrap: "break-word",
          pointerEvents: "none",
        }}
      >
        {content}
      </Html>
      <Html
        position={[0.55, 0.32, 0]}
        // onOcclude={set}
        style={{
          color: "white",
          position: "relative",
          right: "0",
          bottom: "0",
          opacity: isActive ? 1 : 0,
          fontFamily: "OTWelcomeRA",
          textAlign: "left",
          fontWeight: "lighter",
          whiteSpace: "pre-wrap",
          width: "180px",
          overflowWrap: "break-word",
          pointerEvents: "none",
        }}
      >
        작성자 : {nickname}
      </Html>
      {/* </Text> */}
    </group>
  );
}
