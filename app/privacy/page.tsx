import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                CareerPilot Salone is committed to protecting your privacy. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our platform. Please read this privacy policy
                carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Register for an account</li>
                <li>Build your CV</li>
                <li>Complete your profile</li>
                <li>Contact our support team</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This information may include your name, email address, phone number, education history, work experience,
                skills, and career preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain our services</li>
                <li>Generate personalized career recommendations</li>
                <li>Create and manage your CV</li>
                <li>Track your progress through career roadmaps</li>
                <li>Improve and optimize our platform</li>
                <li>Communicate with you about updates and new features</li>
                <li>Provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>
                  With service providers who assist in operating our platform (under strict confidentiality agreements)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing your personal information</li>
                <li>Request transfer of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and store certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent. However, if you do not accept cookies, you may not be able to use some features of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is not intended for children under the age of 16. We do not knowingly collect personal
                information from children under 16. If you become aware that a child has provided us with personal
                information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at info@careerpilot.sl.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
