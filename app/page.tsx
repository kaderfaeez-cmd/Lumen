import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Specs } from "@/components/sections/Specs";
import { Refine } from "@/components/sections/Refine";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Specs />
      <Refine />
      <Closing />
      <Footer />
    </main>
  );
}
