import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";

import CanvasLoader from "../Loader";
const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf", true); // Enable Draco compression if possible
  const transformProps = useMemo(
    () => ({
      scale: isMobile ? 0.3 : 0.75,
      position: isMobile ? [0, -2.5, -0.5] : [0, -3.25, -1.5],
      rotation: [-0.01, -0.02, -0.01],
    }),
    [isMobile]
  );
  return (
    <mesh>
      <hemisphereLight intensity={0.75} groundColor="black" />
      <pointLight intensity={0.3} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
      />
      <primitive object={scene} {...transformProps} />
    </mesh>
  );
};

const ComputerCanvas = () => {
  const canvasRef = useRef();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const handleContextLost = (event) => {
      event.preventDefault();
      // Optionally, inform the user that the WebGL context was lost and attempt to restore it
      console.log("Attempting to restore WebGL context");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored. You may need to reload resources.");
      // Reload any necessary WebGL resources or reset the state as needed
    };

    canvasElement.addEventListener("webglcontextlost", handleContextLost);
    canvasElement.addEventListener(
      "webglcontextrestored",
      handleContextRestored
    );

    return () => {
      canvasElement.removeEventListener("webglcontextlost", handleContextLost);
      canvasElement.removeEventListener(
        "webglcontextrestored",
        handleContextRestored
      );
    };
  }, []);
  return (
    <Canvas
      ref={canvasRef}
      frameloop="demand"
      // shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
