// components
import Hero from "./_components/Hero";
import ContactUs from "@/app/contact-us/_components/page-content";
import About from "@/app/about-us/_components/About";
import HomeDrugsWrapper from "./_components/home-drugs-wrapper";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeDrugsWrapper />
      <About />
      <ContactUs />
    </>
  );
}
