import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Subscribe from "../components/Subscribe";

const About = () => {
  return (
    <div>
      <div class="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>

      <div class="my-10 flex flex-col md:flex-row gap-16">
        <img class="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div class="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b class="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div class=" text-xl py-4">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
        {/* <div class="inline-flex gap-2 items-center mb-3">
          <p class="text-gray-500">
            WHY <span class="text-gray-700 font-medium">CHOOSE US</span>
          </p>
          <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div> */}
      </div>

      <div class="flex flex-col md:flex-row text-sm mb-20">
        <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p class=" text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p class=" text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p class=" text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      <Subscribe />
      {/* <div class=" text-center">
        <p class="text-2xl font-medium text-gray-800">
          Subscribe now &amp; get 20% off
        </p>
        <p class="text-gray-400 mt-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <form class="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
          <input
            class="w-full sm:flex-1 outline-none"
            type="email"
            placeholder="Enter your email"
            required=""
          />
          <button type="submit" class="bg-black text-white text-xs px-10 py-4">
            SUBSCRIBE
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default About;
