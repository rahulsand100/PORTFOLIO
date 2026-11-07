import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { BufferGeometry, Float32BufferAttribute, Vector2 } from "three";

const chromaticOffset = new Vector2(0.00055, 0.00055);

function ParticleField({ mobile, reducedMotion }) {
  const points = useRef(null);
  const geometry = useMemo(() => {
    const count = mobile ? 550 : 1900;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = Math.sin(index * 12.9898) * 6.5;
      positions[index * 3 + 1] = Math.sin(index * 78.233) * 4.5;
      positions[index * 3 + 2] = Math.sin(index * 37.719) * 4.5;
    }
    const buffer = new BufferGeometry();
    buffer.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return buffer;
  }, [mobile]);

  useFrame((state, delta) => {
    if (!points.current || reducedMotion) return;
    points.current.rotation.y += delta * 0.008;
    points.current.rotation.x = state.pointer.y * 0.025;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.12
      - Math.min(window.scrollY / window.innerHeight, 5) * 0.13;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#00D4FF"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.66}
        depthWrite={false}
      />
    </points>
  );
}

function NeuralCore({ reducedMotion }) {
  const core = useRef(null);
  const halo = useRef(null);
  const ring = useRef(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (core.current) {
      core.current.rotation.x += delta * 0.07;
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.x += (state.pointer.y * 0.17 - core.current.rotation.x) * 0.014;
      core.current.rotation.y += (state.pointer.x * 0.22 - core.current.rotation.y) * 0.014;
      core.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
    }
    if (halo.current) halo.current.rotation.z -= delta * 0.08;
    if (ring.current) ring.current.rotation.x += delta * 0.12;
  });

  return (
    <group>
      <mesh ref={core} scale={1.18}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.74} />
      </mesh>
      <mesh scale={0.68}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#0066FF" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={halo} scale={1.36}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={ring} rotation={[1.15, 0.2, 0]}>
        <torusGeometry args={[1.65, 0.006, 8, 120]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.54} />
      </mesh>
      <mesh rotation={[0.35, 0.5, 0.25]}>
        <torusGeometry args={[1.9, 0.004, 8, 120]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.5} />
      </mesh>
      <pointLight color="#00D4FF" intensity={2.2} distance={5} />
      <pointLight color="#0066FF" intensity={1.1} distance={6} position={[1.6, -0.5, -0.5]} />
    </group>
  );
}

function SceneContents({ mobile, reducedMotion }) {
  const scene = useRef(null);

  useFrame((state) => {
    if (!scene.current || reducedMotion) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 6);
    scene.current.position.y = -scroll * 0.09;
    scene.current.rotation.y = state.pointer.x * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.22} color="#8A9BB5" />
      <directionalLight position={[3, 4, 4]} intensity={0.7} color="#8A9BB5" />
      <group ref={scene}>
        <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={0} floatIntensity={reducedMotion ? 0 : 0.13}>
          <NeuralCore reducedMotion={reducedMotion} />
        </Float>
      </group>
      <ParticleField mobile={mobile} reducedMotion={reducedMotion} />
      {!mobile && !reducedMotion && <Sparkles count={70} scale={[8, 5, 5]} size={1.3} speed={0.16} color="#00D4FF" />}
      <EffectComposer multisampling={0}>
        <Bloom intensity={0.75} luminanceThreshold={0.08} luminanceSmoothing={0.25} mipmapBlur />
        <ChromaticAberration offset={chromaticOffset} />
        <Noise opacity={0.025} />
      </EffectComposer>
    </>
  );
}

export default function Scene3D() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 700px)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px)");
    const update = (event) => setMobile(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setReducedMotion(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.3], fov: 40 }}
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{ alpha: true, antialias: !mobile, powerPreference: "low-power" }}
      performance={{ min: 0.5 }}
      aria-label="Animated neon blue neural network"
    >
      <SceneContents mobile={mobile} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
