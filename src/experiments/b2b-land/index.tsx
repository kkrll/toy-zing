import { Aiden } from "./Aiden";
import { BusinessValue } from "./BusinessValue";
import { CTA } from "./CTA";
import { Deploy } from "./Deploy";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Infrastructure } from "./Infrastructure";
import { Integration } from "./Integration";
import { Navigation } from "./Navigation";
import { Problems } from "./Problems";
import { Validated } from "./Validated";
import { Value } from "./Value";

const B2BLand = () => {
  return (
    <>
      <Navigation />
      <main className="p-4 bg-theme-bg-chat flex flex-col gap-4">
        <Hero />
        <Problems />
        <Infrastructure />
        <Value />
        <BusinessValue />
        <Validated />
        <Experience />
        <Aiden />
        <Deploy />
        <Integration />
        <CTA />
      </main>
    </>
  );
};

export default B2BLand;
