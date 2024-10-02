import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import image2 from "../assets/image 2.jpg";

const Home = () => {
  return (
    <div className="relative h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-black opacity-40 dark:opacity-70" // Dark overlay
        aria-hidden="true" // This div is purely for styling and accessibility
      ></div>
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image2})` }}
      ></div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }} // Start off-screen and invisible
        animate={{ y: 0, opacity: 1 }} // Animate to on-screen and visible
        transition={{ duration: 1 }} // Animation duration
        className="text-4xl md:text-6xl font-bold mb-4 relative italic z-10" // Relative z-index to bring it above the overlay
      >
        Welcome to the Info Flix
      </motion.h1>

      <motion.p
        initial={{ y: -50, opacity: 0 }} // Start off-screen and invisible
        animate={{ y: 0, opacity: 1 }} // Animate to on-screen and visible
        transition={{ duration: 1, delay: 0.2 }} // Animation duration and delay
        className="text-lg md:text-xl mb-8 text-center relative italic z-10"
      >
        Discover your favorite movies.
      </motion.p>
    </div>
  );
};

export default Home;
