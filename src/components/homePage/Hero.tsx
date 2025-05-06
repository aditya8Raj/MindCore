import Image from "next/image";
import React from "react";
// import { FaChevronRight } from "react-icons/fa";
import heroImg from "../../../public/hero_img.png";
import Shinytext from "../kokonutui/shinytext";
import HeroBtn from "../kokonutui/herobtn";

export default function Hero() {
  return (
    <div className="relative bg-black">
      <div className="absolute top-0 z-[0] h-screen w-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative max-w-full mx-auto  z-1">
        <div className="max-w-screen-xl z-10 mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
          <div className="space-y-5 max-w-3xl leading-0  lg:leading-5 mx-auto text-center">
            <Shinytext />
            <h2 className="text-4xl tracking-tighter font-geist  bg-clip-text bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-transparent   mx-auto md:text-6xl">
              Transform raw data into AI-ready assets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-200">
                with the MindRag framework.
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-gray-300">
              MindRag helps you convert messy data into clean, structured
              formats ready for machine learning — fast and effortlessly.
            </p>
            <div className="items-center  justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <HeroBtn />
            </div>
          </div>
          <div className="mt-32 mx-10 overflow-hidden rounded-3xl">
            <Image
              src={heroImg}
              alt="Hero Image"
              className="w-full shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
