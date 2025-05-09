"use client";

import FeatureCards from "@/components/homePage/FeatureCards";
import { Hero } from "@/components/homePage/Hero";
import { Loader } from "@/components/ui/Loader";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          <Hero />
          <FeatureCards />
        </>
      )}
    </div>
  );
}
