import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-gradient-salone uppercase tracking-tight italic">Frequently Asked <br /> Questions</h1>
            <p className="text-xl text-slate-500 font-medium mt-4 italic">Find answers to common questions about CareerPilot Salone</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">What is CareerPilot Salone?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                CareerPilot Salone is a comprehensive career guidance platform designed specifically for Sierra Leone.
                We provide personalized career recommendations, CV building tools, learning roadmaps, and resources to
                help you discover and pursue your ideal career path.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">Is CareerPilot Salone free to use?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Yes! CareerPilot Salone offers free access to core features including career exploration, CV building,
                and basic roadmaps. Premium features with advanced recommendations and personalized mentorship may be
                available in the future.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">How do career recommendations work?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Our career recommendations are based on your skills, interests, education, and career goals. The
                platform analyzes this information and matches you with careers that align with your profile and the
                current job market in Sierra Leone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">Can I download my CV?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Yes! Once you complete your CV using our builder, you can download it as a PDF file. The CV is
                professionally formatted and ready to send to potential employers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">What is a career roadmap?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                A career roadmap is a step-by-step learning path that guides you from your current position to your
                career goal. It includes specific tasks, skills to learn, resources to use, and estimated timeframes for
                each milestone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">How often is career information updated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                We regularly update our career database to reflect current market trends, salary information, and job
                demand in Sierra Leone. Major updates typically occur quarterly, with minor updates happening monthly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                Can I change my career path after starting a roadmap?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Your career journey is flexible. You can explore different careers at any time and switch roadmaps as
                your interests and goals evolve. Your progress will be saved for each roadmap.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">Is my personal information secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Yes, we take data security seriously. All personal information is encrypted and stored securely. We
                never share your data with third parties without your explicit consent. Please review our Privacy Policy
                for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">Can employers see my profile?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                Your profile is private by default. You have complete control over what information you share and with
                whom. In the future, we may introduce optional features that allow you to make your profile visible to
                potential employers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">How do I get support if I have issues?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                You can reach our support team through the Help page, or email us directly at careerpilotsalone@gmail.com. We
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
