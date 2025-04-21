import React from "react";
import { HeroSection } from "../hero-section";

const Hero = () => {
  return (
    <>
      <HeroSection
        title="Welcome to Our Platform"
        subtitle={{
          regular: "Power Up Your AI Stack With ",
          gradient: "Seamless Data Transformation",
        }}
        description="From scraping to structuring, streamline your entire training data pipeline with modular tools."
        ctaText="See Features"
      />
    </>
  );
};

export default Hero;
