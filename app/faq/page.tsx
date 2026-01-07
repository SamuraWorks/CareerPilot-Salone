import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { Sparkles, HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">


      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* PREMIUM HERO HEADER */}
          <section className="relative rounded-[3rem] overflow-hidden bg-[#0B1F3A] min-h-[300px] flex items-center shadow-2xl group mb-12">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/salone_success.png"
                alt="FAQ"
                fill
                className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent z-10" />
            </div>

            <div className="relative z-20 max-w-4xl p-10 md:p-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[#1FA774] font-bold text-xs uppercase tracking-widest">Support Center</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight font-poppins">
                Frequently <span className="text-[#F4C430]">Asked</span> Questions
              </h1>
              <p className="text-lg text-slate-300 font-medium font-inter max-w-xl leading-relaxed">
                Find answers to common questions about CareerPilot Salone and how we empower your journey.
              </p>
            </div>
          </section>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">What is CareerPilot Salone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                CareerPilot Salone is a comprehensive career guidance platform designed specifically for Sierra Leone.
                We provide personalized career recommendations, CV building tools, learning roadmaps, and resources to
                help you discover and pursue your ideal career path.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">Is CareerPilot Salone free to use?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! CareerPilot Salone offers free access to core features including career exploration, CV building,
                and basic roadmaps. Premium features with advanced recommendations and personalized mentorship may be
                available in the future.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">How do career recommendations work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Our career recommendations are based on your skills, interests, education, and career goals. The
                platform analyzes this information and matches you with careers that align with your profile and the
                current job market in Sierra Leone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Can I download my CV?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! Once you complete your CV using our builder, you can download it as a PDF file. The CV is
                professionally formatted and ready to send to potential employers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">What is a career roadmap?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                A career roadmap is a step-by-step learning path that guides you from your current position to your
                career goal. It includes specific tasks, skills to learn, resources to use, and estimated timeframes for
                each milestone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">How often is career information updated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We regularly update our career database to reflect current market trends, salary information, and job
                demand in Sierra Leone. Major updates typically occur quarterly, with minor updates happening monthly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                Can I change my career path after starting a roadmap?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Your career journey is flexible. You can explore different careers at any time and switch roadmaps as
                your interests and goals evolve. Your progress will be saved for each roadmap.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">Is my personal information secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, we take data security seriously. All personal information is encrypted and stored securely. We
                never share your data with third parties without your explicit consent. Please review our Privacy Policy
                for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">Can employers see my profile?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Your profile is private by default. You have complete control over what information you share and with
                whom. In the future, we may introduce optional features that allow you to make your profile visible to
                potential employers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">How do I get support if I have issues?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                You can reach our support team through the Help page, or email us directly at info@careerpilot.sl. We
                typically respond within 24-48 hours during business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  )
}
