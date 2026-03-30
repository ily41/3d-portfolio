  import { useFrame } from "@react-three/fiber"
  import { easing } from "maath"
  import { useRef } from "react"

  const Camera = ({ children, controls }) => {
    const groupRef = useRef()

    useFrame((state, delta) => {
      // 1. Smoothly damp Position using Leva values
      easing.damp3(
        state.camera.position, 
        [controls.posX, controls.posY, controls.posZ], 
        0.25, 
        delta
      )

      // 2. Smoothly damp Rotation (Euler)
      easing.dampE(
        state.camera.rotation, 
        [controls.rotX, controls.rotY, controls.rotZ], 
        0.25, 
        delta
      )

      easing.dampE(
        groupRef.current.rotation,
        [
          state.pointer.y / 200,   // tilt up/down
          -state.pointer.x / 200,  // tilt left/right  
          0
        ],
        0.1,
        delta
      )

      state.camera.updateProjectionMatrix()
    })

    return <group ref={groupRef}>{children}</group>
  }

  export default Camera