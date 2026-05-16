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
      <SectionDivider variant="wave" label="CH. 02" />
      <About />
      <SectionDivider variant="organic" />
      <Services />
      <SectionDivider variant="wave" label="CH. 04" />
      <Practitioners />
      <SectionDivider variant="organic" />
      <Contact />
    </>
  );
}
