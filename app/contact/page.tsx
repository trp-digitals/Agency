import Navbar from "@/components/Navbar";
import MaxWrapper from "@/components/ui/MaxWrapper";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <Navbar />
      <MaxWrapper>
        <h1 className="text-5xl font-bold mb-8">Let's <span className="text-accent">Connect</span></h1>
        <p className="text-xl text-foreground/60 max-w-2xl">
          Ready to start your next project? Get in touch and let's craft something special.
        </p>
      </MaxWrapper>
      <Footer />
    </main>
  );
}
