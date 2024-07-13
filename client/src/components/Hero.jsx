import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import React from "react";
const Hero = () => {
  return (
    <section className=" relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col  justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white `}>
            Hi, I&apos;m <span className="text-[#915eff]">Ahmed Nagdy</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2 `}>
            I&apos;m a Full Stack Developer,
            <br className="sm:block hidden" /> I can help you build your next
            big thing with the latest technologies.
          </p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about" className="text-white">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-center p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 bg-secondary mb-1 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

const MemoizedHero = React.memo(Hero);
export default MemoizedHero;
