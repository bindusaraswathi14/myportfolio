"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { YoutubeIcon, InstagramIcon, FacebookIcon } from "./Brand";
import { PERSONAL_INFO } from "@/data/personal-info";

// 3D Scene Components
function GlowingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshPhysicalMaterial color="#3B82F6" emissive="#8B5CF6" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} transmission={0.6} thickness={1.2} wireframe />
      </mesh>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 64]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={0.7} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingCinematicFrames() {
  const frame1 = useRef<THREE.Group>(null);
  const frame2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (frame1.current) frame1.current.rotation.y += delta * 0.1;
    if (frame2.current) frame2.current.rotation.y -= delta * 0.08;
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <group ref={frame1} position={[3.5, 1.2, -1]} rotation={[0.2, -0.4, 0.1]}>
          <mesh>
            <boxGeometry args={[2.4, 1.35, 0.04]} />
            <meshPhysicalMaterial color="#171B3A" transmission={0.85} opacity={0.7} transparent roughness={0.15} />
          </mesh>
        </group>
      </Float>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <group ref={frame2} position={[-3.6, -1.0, -1.5]} rotation={[-0.1, 0.4, -0.15]}>
          <mesh>
            <boxGeometry args={[2.6, 1.1, 0.04]} />
            <meshPhysicalMaterial color="#171B3A" transmission={0.85} opacity={0.65} transparent roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

function FloatingParticles({ count = 80 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#8B5CF6" size={0.06} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.pointer.x * 0.4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -state.pointer.y * 0.3, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#3B82F6" intensity={2.5} />
      <pointLight position={[-5, -5, -2]} color="#8B5CF6" intensity={2} />
      <GlowingCore />
      <FloatingCinematicFrames />
      <FloatingParticles count={80} />
    </group>
  );
}

function SceneCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <SceneContent />
      </Canvas>
    </div>
  );
}

const DynamicScene = dynamic(() => Promise.resolve(SceneCanvas), { ssr: false });

export function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setCanRender3D(Boolean(gl));
    } catch {
      setCanRender3D(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-royal/20 to-hyacinth/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-royal/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-hyacinth/15 blur-[100px]" />
      {mounted && canRender3D && <DynamicScene />}
    </div>
  );
}

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PERSONAL_INFO.hero.rotatingPhrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-jet">
      <Hero3DCanvas />
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blackberry/60 border border-royal/30 text-xs sm:text-sm font-mono text-slate-300 backdrop-blur-md mb-6 shadow-glow-royal">
          <Sparkles size={14} className="text-royal animate-pulse" />
          <span>{PERSONAL_INFO.brandExtended}</span>
          <span className="text-slate-500">•</span>
          <span className="text-hyacinth font-semibold">{PERSONAL_INFO.channelName}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-heading font-black tracking-tight text-fluid-hero text-white uppercase drop-shadow-2xl">
          {PERSONAL_INFO.hero.headline}
        </motion.h1>

        <div className="h-12 sm:h-16 flex items-center justify-center overflow-hidden my-3">
          <AnimatePresence mode="wait">
            <motion.p key={phraseIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }} className="font-heading text-xl sm:text-3xl md:text-4xl font-bold text-gradient-accent tracking-wide">
              {PERSONAL_INFO.hero.rotatingPhrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-2xl mx-auto mt-2 space-y-3">
          <p className="font-heading text-lg sm:text-xl font-medium text-slate-200">&ldquo;{PERSONAL_INFO.hero.animatedSecondary}&rdquo;</p>
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed">{PERSONAL_INFO.hero.intro}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
          <Link href="/projects" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-gradient text-white font-heading font-bold text-sm tracking-wider uppercase shadow-glow-royal hover:scale-[1.02] transition-transform">
            <span>Explore My Work</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/about" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blackberry/80 hover:bg-blackberry text-slate-200 hover:text-white border border-white/10 text-sm font-heading font-semibold tracking-wider uppercase backdrop-blur-md transition-all">
            <span>About Me</span>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="flex items-center justify-center gap-6 mt-12 pt-6 border-t border-white/5">
          <a href={PERSONAL_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-400 transition-colors" title="YouTube">
            <YoutubeIcon size={20} />
          </a>
          <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-pink-400 transition-colors" title="Instagram">
            <InstagramIcon size={20} />
          </a>
          <a href={PERSONAL_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-blue-400 transition-colors" title="Facebook">
            <FacebookIcon size={20} />
          </a>
        </motion.div>
      </div>

      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono tracking-widest uppercase pointer-events-none">
        <span>Scroll to Explore</span>
        <ArrowDown size={14} className="text-royal" />
      </motion.div>
    </section>
  );
}
