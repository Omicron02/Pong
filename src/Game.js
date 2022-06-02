import styles from "./styles.module.css";
import { Canvas, useFrame} from "@react-three/fiber";
import { Physics, useSphere, useBox, usePlane } from "@react-three/cannon";
import {useControls} from "./Controls"

function Pad(props) 
{
  const [ref, api] = useBox(() => ({
    type: "Kinematic",
    args: [1, 15, 1],
    mass: 1,
    ...props
  }));

  return (
    <mesh ref={ref} position={props.position} >
      <boxBufferGeometry attach="geometry" args={[1, 15, 1]}/>
      <meshStandardMaterial attach="material" color = {props.color}/>
      
    </mesh>
  )
}

function Ball(props) 
{
  const [ref, api] = useSphere(() => ({
    mass: 1,
    args: [1],
    position: [5,0,0],
    velocity: [100,0,0],
    ...props
  }))

  return (
    <mesh ref = {ref}>
      <sphereBufferGeometry attach = "geometry" args = {[1, 64, 64]}/>
      <meshStandardMaterial color = {props.color}/>
    </mesh>
  )
}

function Plane(props)
{
  const  [ref, api] = usePlane(() => ({
    mass: 10,
    ...props
  }))
  return (
    <mesh ref = {ref} position = {props.position} scale = {300}>
      <planeBufferGeometry/>
      <meshStandardMaterial color = {props.color}/>
    </mesh>
  )
}

// function Boundaries(props)
// {
//   const boundaryProps = [{position: [0,0,-0.5], color: "black"}]
//   var boundaries = () => boundaryProps.map(item => <Plane 
//                                                   key = {item.position} 
//                                                   position = {item.position} 
//                                                   color = {item.color}
//                                                 />)
//   return(
//     <boundaries/>
//   )
// }


function Game() 
{
  const controls = useControls()
  
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
        <Physics
          gravity = {[0,0,0]}
          defaultContactMaterial={{
            friction: 1,
            restitution: 1,
            // contactEquationStiffness: 0,
            // contactEquationRelaxation: 0,
            // frictionEquationStiffness: 0,
            // frictionEquationRelaxation: 0,
          }}>
          <ambientLight/>
          {/* <Boundaries/> */}
          {/* <Plane position = {[0,0,-1]} color = "black"/> */}
          <Pad position={[-100, 0, 0]} color = "red" />
          <Pad position={[100, 0, 0]} color = "blue"/>
          <Ball color = "green"/>
        </Physics>
      </Canvas>
    </div>
  );
}

export default Game;
