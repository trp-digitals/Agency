import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />
      <MaxWrapper>
        <h1 className="text-5xl font-bold mb-8">Selected <span className="text-secondary">Portfolio</span></h1>
        <p className="text-xl text-foreground/60 max-w-2xl">
          A showcase of our most ambitious projects and their impact on the digital landscape.
        </p>
      </MaxWrapper>
      <Footer />
    </main>
  );
}
