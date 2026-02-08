import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stats, Html } from '@react-three/drei';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Camera, Share2 } from 'lucide-react';
import * as THREE from 'three';

// ---------- Utility: simple Perlin-like height (value noise) ----------
function fractalNoise(x: number, z: number, octaves = 4) {
  let total = 0;
  let freq = 1;
  let amp = 1;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    total += (simpleNoise(x * freq, z * freq) * 0.5 + 0.5) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return total / max;
}

// Very small deterministic pseudo noise function (not Perlin, but ok for demo)
function simpleNoise(x: number, z: number) {
  const s = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

// ---------- Terrain component ----------
function Terrain({ size = 20, segments = 128, height = 2 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const position = geo.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const h = fractalNoise(x * 0.2, z * 0.2, 5) * height;
      position.setY(i, h);
    }
    position.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [size, segments, height]);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial
        attach="material"
        roughness={0.9}
        metalness={0.0}
        color="#6b8e23"
        transparent={false}
      />
    </mesh>
  );
}

// ---------- Aquifer (translucent box under terrain) ----------
function Aquifer({ width = 18, depth = 6, height = 3, y = -1.5 }) {
  return (
    <group position={[0, y - height / 2, 0]}>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          transmission={0.6}
          roughness={0.1}
          metalness={0}
          opacity={0.6}
          transparent={true}
          color="#2b6ea3"
        />
      </mesh>
      {/* outline */}
      <mesh>
        <boxGeometry args={[width + 0.02, height + 0.02, depth + 0.02]} />
        <meshBasicMaterial wireframe color="#1b3a57" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ---------- Recharge Well / Basin component ----------
function RechargeBasin({ position = [3, 0.1, -2], radius = 1.2, depth = 0.8 }: {
  position?: [number, number, number];
  radius?: number;
  depth?: number;
}) {
  return (
    <group position={position}>
      {/* basin rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, 0.15, 32]} />
        <meshStandardMaterial color="#4b2e83" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* basin hole */}
      <mesh position={[0, -depth / 2, 0]}>
        <cylinderGeometry args={[radius * 0.85, radius * 0.85, depth, 32]} />
        <meshStandardMaterial color="#2f1b4f" metalness={0.1} roughness={0.9} />
      </mesh>
    </group>
  );
}

// ---------- Particles representing infiltrating water ----------
function ParticleSystem({ count = 150, area = 2.5, aquiferY = -2.0 }) {
  const meshRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * area;
      const z = (Math.random() - 0.5) * area;
      const y = Math.random() * 2 + 0.5;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, area]);

  const velocities = useMemo(() => new Float32Array(count).fill(0), [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      velocities[i] += -0.01 - Math.random() * 0.02; // gravity-ish
      pos[idx] += velocities[i];
      // if below aquifer top, reset to surface
      if (pos[idx] < aquiferY + Math.random() * 0.3) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * area;
        pos[i * 3 + 1] = Math.random() * 2 + 0.5;
        pos[i * 3 + 2] = (Math.random() - 0.5) * area;
        velocities[i] = 0;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.07} sizeAttenuation transparent opacity={0.9} color="#3b82f6" />
    </points>
  );
}

// ---------- Streamlines (simple curved tubes) ----------
function Streamline({ from = [2.5, 0.5, -1.5], to = [2.5, -2.2, -1.5], segments = 40 }: {
  from?: [number, number, number];
  to?: [number, number, number];
  segments?: number;
}) {
  const curve = useMemo(() => {
    const p0 = new THREE.Vector3(...from);
    const p3 = new THREE.Vector3(...to);
    const p1 = p0.clone().lerp(p3, 0.33).add(new THREE.Vector3(0.0, -0.6, 0.0));
    const p2 = p0.clone().lerp(p3, 0.66).add(new THREE.Vector3(0.0, -0.6, 0.0));
    return new THREE.CubicBezierCurve3(p0, p1, p2, p3);
  }, [from, to]);

  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, segments, 0.03, 8, false), [curve, segments]);

  return (
    <mesh geometry={tubeGeometry}>
      <meshStandardMaterial emissive="#5eead4" emissiveIntensity={0.4} roughness={0.6} />
    </mesh>
  );
}

// ---------- AR Viewer Component ----------
const ARViewer = () => {
  const [isARSupported, setIsARSupported] = useState(false);
  
  useEffect(() => {
    // Check for AR support (WebXR)
    if ('xr' in navigator) {
      (navigator as any).xr?.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
      });
    } else if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
      // Fallback for mobile devices
      setIsARSupported(true);
    }
  }, []);

  const handleARView = () => {
    if (isARSupported) {
      // In a real implementation, this would launch AR
      alert('AR functionality would launch here on a compatible device!');
    } else {
      alert('AR not supported on this device');
    }
  };

  return (
    <div className="mt-4">
      <Button 
        onClick={handleARView}
        disabled={!isARSupported}
        className="w-full"
        variant={isARSupported ? "default" : "secondary"}
      >
        <Eye className="mr-2 h-4 w-4" />
        {isARSupported ? 'View in AR' : 'AR Not Available'}
      </Button>
    </div>
  );
};

// ---------- Main 3D Visualization Component ----------
export const RechargeModel3D = () => {
  const [showParticles, setShowParticles] = useState(true);
  const [particleCount, setParticleCount] = useState(200);
  const [timeOfDay, setTimeOfDay] = useState(0.6);
  const aquiferTopY = -1.5;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Artificial Groundwater Recharge
              <Badge variant="secondary">Interactive 3D</Badge>
            </CardTitle>
            <CardDescription>
              Advanced visualization of recharge system with particle flow
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Main 3D Canvas */}
        <div className="h-96 bg-gradient-to-b from-sky-100 to-blue-50 rounded-lg mb-4 overflow-hidden">
          <Canvas shadows camera={{ position: [8, 6, 8], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 2]} intensity={1.0} castShadow />
            <pointLight position={[-10, 2, -10]} intensity={0.4} />

            <Terrain size={20} segments={160} height={2.2} />
            <Aquifer width={18} depth={8} height={3.6} y={aquiferTopY - 1.2} />
            <RechargeBasin position={[3.8, 0.4, -2.0]} radius={1.25} depth={0.9} />

            {showParticles && <ParticleSystem count={particleCount} area={6} aquiferY={aquiferTopY - 1.2} />}

            {/* two streamlines into aquifer near basin */}
            <Streamline from={[3.2, 0.4, -2.0]} to={[3.2, aquiferTopY - 0.8, -2.0]} />
            <Streamline from={[4.1, 0.4, -1.7]} to={[4.1, aquiferTopY - 0.9, -1.7]} />

            <OrbitControls makeDefault enablePan enableRotate enableZoom />
            <Stats />
          </Canvas>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Visualization Controls</h4>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="particles"
                checked={showParticles}
                onChange={(e) => setShowParticles(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="particles" className="text-sm">Show infiltrating particles</label>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Particle count: {particleCount}</label>
              <input
                type="range"
                min={50}
                max={1000}
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Time of day</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(Number(e.target.value))}
                className="w-full mt-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Legend</h4>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span>Terrain Surface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 opacity-60 rounded"></div>
                <span>Aquifer (translucent)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-700 rounded"></div>
                <span>Recharge Basin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Water Particles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-300 rounded"></div>
                <span>Flow Streamlines</span>
              </div>
            </div>
          </div>
        </div>

        <ARViewer />
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Camera className="mr-2 h-4 w-4" />
            Screenshot
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="mr-2 h-4 w-4" />
            Share Model
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          Use mouse to orbit/zoom. Particles simulate water infiltration into the aquifer through the recharge basin.
        </p>
      </CardContent>
    </Card>
  );
};