import { OrbitControls, useHelper } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
import React, { Suspense, useLayoutEffect, useRef } from 'react'
import CanvasLoader from './CanvasLoader'
import Room from './Room'
import { folder, Leva, useControls } from 'leva'
import { AxesHelper, SpotLightHelper } from 'three'
import Camera from './Camera'
import { SpotLight } from '@react-three/drei'
import HandCursor from './HandCursor'



const App = () => {



const controls = useControls({
  // FOLDER 1: Camera Controls
  'Camera View': folder({
    posX: { value: -2.6, min: -10, max: 10, step: 0.1 },
    posY: { value: 3.0, min: -10, max: 10, step: 0.1 },
    posZ: { value: 0.6, min: -10, max: 10, step: 0.1 },
    rotX: { value: -0.24, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotY: { value: 0.00, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotZ: { value: 0.00, min: -Math.PI, max: Math.PI, step: 0.01 },
  }),

  // FOLDER 2: Room Model Transformation
  'Room Model': folder({
    positionX: { value: 0, min: -10, max: 10, step: 0.1 },
    positionY: { value: 0, min: -10, max: 10, step: 0.1 },
    positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scaleX: { value: 2.5, min: 0, max: 10, step: 0.1 },
    scaleY: { value: 2.5, min: 0, max: 10, step: 0.1 },
    scaleZ: { value: 2.5, min: 0, max: 10, step: 0.1 },
  }),

  // FOLDER 3: Spotlight & Target
  'Lighting': folder({
    color: '#ffdfad',
    lightX: { value: 0, min: -10, max: 10, step: 0.01 },
    lightY: { value: 5, min: -10, max: 10, step: 0.01 },
    lightZ: { value: 0, min: -10, max: 10, step: 0.01 },
    targetX: { value: 0, min: -10, max: 10, step: 0.1 },
    targetY: { value: 0, min: -10, max: 10, step: 0.1 },
    targetZ: { value: 0, min: -10, max: 10, step: 0.1 },
    angle: { value: 1.0, min: 0, max: Math.PI / 2, step: 0.05 },
    penumbra: { value: 0.8, min: 0, max: 1, step: 0.1 },
    intensityV: { value: 30, min: 0, max: 200, step: 1 },
  }),

  'Spotlight 2': folder({
    color2: '#ffffff',
    light2X: { value: 3, min: -10, max: 10, step: 0.01 },
    light2Y: { value: 5, min: -10, max: 10, step: 0.01 },
    light2Z: { value: 3, min: -10, max: 10, step: 0.01 },
    target2X: { value: -1, min: -10, max: 10, step: 0.01 },
    target2Y: { value: 0, min: -10, max: 10, step: 0.01 },
    target2Z: { value: -1, min: -10, max: 10, step: 0.01 },
    intensity2: { value: 50, min: 0, max: 200, step: 1 },
    angle2: { value: 1.0, min: 0, max: Math.PI / 2, step: 0.05 },
  }),
})
// Replace your MovingLight2 (the desk lamp) with:
function DeskLampLight() {
  const targetRef = useRef()
  // useHelper(targetRef, SpotLightHelper, 'cyan');

  return (
    <>
      <SpotLight
        ref={targetRef}
        position={[-1.97, 2.55, -1.32]}
        target-position={[-2.8, 0, -1]} 
        intensity={10}
        angle={1.1}
        penumbra={0.5}
        color="#ffdfad"
        volumetric
        opacity={0.3}
        radiusTop={0.03}
        radiusBottom={0.5}
        distance={1.5}
        attenuation={2.5}
        anglePower={5}
      />
    </>
  )
}
  function MovingLight() {
    const lightRef = useRef();
    const targetRef = useRef();
    // useHelper(lightRef, SpotLightHelper, 'cyan');

    // CRITICAL: This links the light to the target object correctly
    useLayoutEffect(() => {
      if (lightRef.current && targetRef.current) {
        lightRef.current.target = targetRef.current;
      }
    }, []); // Run once on mount

    return (
      <>
        {/* This is the invisible point the light will look at */}
        <object3D 
          ref={targetRef} 
          // position={[controls.targetX, controls.targetY, controls.targetZ]} 
          position={[-2.9, 0.0, -1.1]} 
        />

        <spotLight
          ref={lightRef}
          color={controls.color}
          // position={[controls.lightX, controls.lightY, controls.lightZ]}
          position={[-2.87, 4.75, -1.06]}
          intensity={controls.intensityV}
          // angle={controls.angle}
          angle={1.50}
          penumbra={controls.penumbra}
          distance={controls.distance}
          decay={controls.decay}
        />
      </>
    );
  }

  function MovingLight2() {
      const light2Ref = useRef();
      const target2Ref = useRef();

      // Add this to your existing useLayoutEffect to link the target
      useLayoutEffect(() => {
        if (light2Ref.current && target2Ref.current) {
          light2Ref.current.target = target2Ref.current;
        }
      }, []);
    
      // Place this inside your <Canvas> or light group
      // useHelper(light2Ref, SpotLightHelper, "red")

    return (
      <>
        {/* Invisible target for Light 2 */}
        <object3D 
          ref={target2Ref} 
          position={[controls.target2X, controls.target2Y, controls.target2Z]} 
        />
        <spotLight
          ref={light2Ref}
          color={controls.color2}
          // position={[controls.light2X, controls.light2Y, controls.light2Z]}
          position={[-1.97, 2.55, -1.33]}
          intensity={controls.intensity2}
          angle={controls.angle2}
          penumbra={0.5}
          castShadow
        />
      </>
    );
  }

  // Add these refs at the top of your component



  return (
    <>

    <Leva
      persist={true}
      theme={{
      sizes: {
       rootWidth: '300px',      // Makes the entire panel wider
        labelWidth: '90px',      // Shrinks the text area so the slider has more room
        controlGuiWidth: '400px' // Adjusts the width of the sliders/inputs
      },
    }} />

    <Canvas  camera={{ position: [5, 5, 5], fov: 90 }} style = {{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      
      
      <primitive object={new AxesHelper(5)} />
      {/* <OrbitControls enableZoom enablePan enableRotate /> */}

      {/* <directionalLight  position={[1,1,1]} intensity={10} color={0x9CDBA6}/> */}
      <ambientLight intensity={3} />

    
      
      
      <pointLight position={[2, 2, 0]} intensity={0.3} color="#ffddaa" />

      <color attach="background" args={['#000000']}/>

      <Suspense fallback={<CanvasLoader />}>
        <Camera controls={controls}> 
          {/*<HandCursor />*/}

          <MovingLight />
          <MovingLight2 />
           <DeskLampLight />
          <Room 
            position={[controls.positionX, controls.positionY,controls.positionZ]}
            rotation={[controls.rotationX, controls.rotationY,controls.rotationZ]}
            scale={[controls.scaleX, controls.scaleY,controls.scaleZ,]}
          />
        </Camera>
      </Suspense>
      
      

    </Canvas>

    </>
  )
}

export default App
