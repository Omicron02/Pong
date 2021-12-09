import styles from "./styles.module.css";
import { Canvas } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";

function Pad(props) {
  const [ref, api] = useBox(() => ({
    args: [1, 100, 1],
    mass: 1,
    type: "Static",
    ...props
  }));

  return (
    <mesh ref={ref} position={props.position}>
      <boxBufferGeometry attach="geometry" args={[1, 10, 1]} />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
}

function Game() {
  return (
    <div className={styles.gameScreen}>
      <Canvas
        camera={{
          position: [0, 0, 100],
          near: 0.1,
          far: 1000,
          fov: 90
        }}
      >
        <Physics>
          <Pad position={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default Game;
