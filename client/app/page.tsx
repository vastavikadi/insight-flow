"use client";

import { motion } from "framer-motion";

import { MagneticButton } from "@/components/spatial/MagneticButton";
import { BentoShowcase } from "@/components/products/BentoShowcase";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        relative
      "
    >
      <div
        className="
          fixed
          inset-0
          -z-10
          opacity-20
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <Navbar />
      <section
        className="
          h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          relative
        "
      >
        <div
          className="
            absolute
            w-[800px]
            h-[800px]
            rounded-full
            blur-[200px]
            bg-violet-600/20
          "
        />

        <motion.div
          animate={{
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute right-20 top-1/2 hidden lg:block w-[400px] h-[400px] rounded-full bg-gradient-to-br from-violet-500/30 to-transparent blur-3xl"
        />

        <motion.h1 className="text-7xl md:text-[10rem] leading-none font-black tracking-tight">
          Technology
          <br />
          Beyond
          <br />
          Tomorrow
        </motion.h1>

        <p
          className="
            text-zinc-400
            text-xl
            mt-6
          "
        >
          Nexus
        </p>

        <div className="mt-10">
          <MagneticButton>Explore Collection</MagneticButton>
        </div>
      </section>
      <BentoShowcase />
    </main>
  );
}
