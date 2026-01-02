
import { HeroSection } from '@/components/ui/HeroSection';
import { FeaturesSection } from '@/components/ui/FeaturesSection';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of Sierra Leoneans taking control of their future today. It's completely free.
          </p>
          <a href="/login" className="inline-flex h-14 items-center justify-center rounded-full bg-white text-slate-900 px-10 font-bold hover:bg-slate-100 transition-colors">
            Get Started Now
          </a>
        </div>
      </section>
    </main>
  );
}
