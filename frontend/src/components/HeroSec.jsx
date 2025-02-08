import React from "react";
import heroImg from "../assets/hero_img.png";

const HeroSec = () => {
  return (
    <div className="my-3 flex justify-between items-center flex-col md:flex-row rounded border-2 border-[#5D5C68]">
      <div className="left flex justify-center items-center py-10 md:py-0 flex-col gap-0.5 w-full md:w-1/2">
        <div className="text">
          <div className="flex items-center gap-2">
            <hr className="bg-[#5D5C68] w-[35px] h-1" />{" "}
            <p className="text-[20px]">OUR BESTSELLERS</p>
          </div>
          <h2 className="text-[35px] md:text-[40px] leading-relaxed">Latest Arrivals</h2>
          <div className="flex items-center gap-2">
            <p className="text-[20px]">SHOP NOW</p>
            <hr className="bg-[#5D5C68] w-[35px] h-1" />{" "}
          </div>
        </div>
      </div>
      <div className="right basis-1/2">
        <img
          src={heroImg}
          className="w-full h-full object-cover"
          alt="hero-img"
        />
      </div>
    </div>
  );
};

export default HeroSec;
