import Hero from "@/components/Hero";
import WhyStackingCards from "@/components/WhyStackingCards";
import ProblemBentoGrid from "@/components/ProblemBentoGrid";
import Process from "@/components/Process";
import Services from "@/components/Services";
import ServiceModel from "@/components/ServiceModel";
import ClientsGrid from "@/components/ClientsGrid";
import FAQAccordion from "@/components/FAQAccordion";
import IdeaBanner from "@/components/IdeaBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <WhyStackingCards />
      <ProblemBentoGrid />
      <Process />
      <Services />
      <ServiceModel />
      <ClientsGrid />
      <FAQAccordion />
      <IdeaBanner />
    </main>
  );
}

// EMAILJS_SERVICE_ID=service_3ykgu8j
// EMAILJS_TEMPLATE_ID=template_p4p4zw9
// EMAILJS_PUBLIC_KEY=Kk45S6V-0pZGo9gvp
// EMAILJS_PRIVATE_KEY=p2dt86Y3KGvDGBBuWKJBy