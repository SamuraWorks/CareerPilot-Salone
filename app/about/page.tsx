import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Heart, Award, Sparkles, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image Section */}
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-12">
            <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80" alt="CareerPilot Salone Team" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-block mb-3 px-4 py-2 bg-primary/90 rounded-full">
                <span className="text-primary-foreground font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Empowering Sierra Leone
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">About CareerPilot Salone</h1>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Empowering Sierra Leone
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">About CareerPilot Salone</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Empowering Sierra Leone's workforce with accessible career guidance and professional development tools
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-primary/5 rounded-lg p-4 hover:scale-105 transition-transform">
                <p className="text-2xl font-bold text-primary">2025</p>
                <p className="text-xs text-muted-foreground">Founded</p>
              </div>
              <div className="bg-secondary/5 rounded-lg p-4 hover:scale-105 transition-transform">
                <p className="text-2xl font-bold text-secondary">1000+</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
              <div className="bg-accent/5 rounded-lg p-4 hover:scale-105 transition-transform">
                <p className="text-2xl font-bold text-accent">50+</p>
                <p className="text-xs text-muted-foreground">Careers</p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4 hover:scale-105 transition-transform">
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <Card className="mb-12 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    CareerPilot Salone is dedicated to bridging the gap between education and employment in Sierra
                    Leone. We provide personalized career guidance, professional development resources, and job
                    readiness tools to help individuals discover and pursue fulfilling career paths.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform combines career assessment, skills development roadmaps, and CV building tools to
                    create a comprehensive career planning ecosystem tailored for the Sierra Leonean job market.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Making career guidance accessible to all Sierra Leoneans, regardless of their background or
                    location.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Empowerment</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Equipping individuals with the knowledge and tools to take control of their career journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Excellence</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Delivering high-quality career resources and guidance based on best practices and local insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Story */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold">Our Story</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  CareerPilot Salone was founded in 2025 with a simple yet powerful vision: to help every Sierra Leonean
                  discover and achieve their career potential. Our founders recognized the challenges faced by job
                  seekers and career changers in navigating the evolving job market.
                </p>
                <p>
                  Through extensive research and collaboration with local employers, educators, and career counselors,
                  we developed a platform that addresses the unique needs of Sierra Leone's workforce. From recent
                  graduates to experienced professionals seeking new opportunities, CareerPilot Salone provides the
                  guidance and resources needed to succeed.
                </p>
                <p>
                  Today, we serve thousands of users across Sierra Leone, helping them explore career options, develop
                  essential skills, and present themselves professionally to potential employers. Our commitment to
                  continuous improvement ensures that our platform evolves with the changing needs of the job market.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
