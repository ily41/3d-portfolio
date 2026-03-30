import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'

const HandCursor = () => {
  const { scene } = useGLTF('/hand.glb')
  const handRef = useRef()

  useFrame((state, delta) => {
    console.log(state.pointer.x)
    console.log(state.pointer.y)
const { x, y, z } = handRef.current.position;
console.log(`hand: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`);
  if (!handRef.current) return

  easing.damp3(
    handRef.current.position,
    [
      state.pointer.x * 4.5,   // reduce horizontal range
      2 + state.pointer.y * 1.2 ,   // reduce vertical range  
      -0.3 +   (state.pointer.y-1) /2
    ],
    0,
    delta
  )
})

  return (
    <primitive
      ref={handRef}
      object={scene}
      scale={[-0.15, 0.15, 0.15]}   // mirror
      rotation={[-Math.PI /2 + 1,0,0]}  // adjust Z rotation to compensate
    />
  )
}

useGLTF.preload('/hand.glb')
export default HandCursor