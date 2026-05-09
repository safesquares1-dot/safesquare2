import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Practitioners from "@/components/Practitioners";
import Contact from "@/components/Contact";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider variant="wave" />
      <About />
      <SectionDivider variant="organic" />
      <Services />
      <SectionDivider variant="dots" />
      <Practitioners />
      <SectionDivider variant="line" />
      <Contact />
    </>
  );
}