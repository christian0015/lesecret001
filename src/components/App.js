import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, useScroll, Scroll, Preload, ScrollControls, MeshTransmissionMaterial, Text, Image } from '@react-three/drei';
import { easing } from 'maath';
// import './styles.css';

function useImageEffects() {
  useEffect(() => {
    const images = document.querySelectorAll('img.effetZoomGray');

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      images.forEach((img) => {
        const zoomRange = img.getAttribute('zoomRange').split(',').map(Number);
        const grayRange = img.getAttribute('grayRange').split(',').map(Number);

        const zoomValue = 1 + (scrollY / docHeight) * (zoomRange[1] - zoomRange[0]) + zoomRange[0];
        const grayValue = 1 - (scrollY / docHeight) * (grayRange[1] - grayRange[0]) + grayRange[0];

        img.style.transform = `scale(${zoomValue})`;
        img.style.filter = `grayscale(${grayValue})`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

export default function App() {
  useImageEffects();

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
      <ScrollControls damping={0.2} pages={3} distance={0.5}>
        <Lens>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html>
            <div style={{ transform: 'translate3d(0, 12vh, 0)' }}>
              PMNDRS Pendant lamp
              <br />
              bronze, 38 cm
              <br />
              CHF 59.95
              <br />
              <img
                src='/img8.jpg' zoomRange={[0, 1 / 3]} grayRange={[1.6 / 3, 1 / 3]} className="effetZoomGray"
                alt="Sample"
              />
            </div>
          </Scroll>
          <Preload />
        </Lens>
      </ScrollControls>
    </Canvas>
  );
}

function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF('/lens-transformed.glb');
  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());
  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15]);
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
      damping,
      delta
    );
    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor('#d8d7d7');
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh scale={0.25} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
        <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={1.5} anisotropy={0.1} chromaticAberration={0.04} />
      </mesh>
    </>
  );
}

function Images() {
  const group = useRef();
  const data = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame(() => {
    group.current.children.forEach((child, index) => {
      const zoomRange = [0, 1 / 3];
      const grayRange = [1.6 / 3, 1 / 3];
      if (index < 3) {
        child.material.zoom = 1 + data.range(...zoomRange) / 3;
      } else {
        child.material.grayscale = 1 - data.range(...grayRange);
      }
    });
  });
  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[4, height, 1]} url="/img1.jpg" />
      <Image position={[2, 0, 3]} scale={3} url="/img6.jpg" />
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/trip2.jpg" />
    </group>
  );
}

function Typography() {
  const state = useThree();
  const { width, height } = state.viewport.getCurrentViewport(state.cameta, [0, 0, 12]);
  const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black' };
  return (
    <>
      <Text children="to" anchorX="left" position={[-width / 2.5, -height / 10, 12]} {...shared} />
      <Text children="be" anchorX="right" position={[width / 2.5, -height * 2, 12]} {...shared} />
      <Text children="home" position={[0, -height * 4.624, 12]} {...shared} />
    </>
  );
}
