import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Box position={[1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
