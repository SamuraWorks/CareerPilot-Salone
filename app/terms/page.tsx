import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2024</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using CareerPilot Salone, you accept and agree to be bound by the terms and provisions
                of this agreement. If you do not agree to abide by these Terms of Service, please do not use this
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily access the materials on CareerPilot Salone for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on CareerPilot Salone</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Account</h2>
              <p className="text-muted-foreground leading-relaxed">
                To access certain features of the platform, you must create an account. You are responsible for
                maintaining the confidentiality of your account credentials and for all activities that occur under your
                account. You agree to immediately notify us of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of any content you submit to CareerPilot Salone, including your CV, profile
                information, and other materials. By submitting content, you grant us a license to use, store, and
                display that content solely for the purpose of providing our services to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on CareerPilot Salone are provided on an 'as is' basis. CareerPilot Salone makes no
                warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall CareerPilot Salone or its suppliers be liable for any damages (including, without
                limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
                or inability to use the materials on CareerPilot Salone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Revisions and Errata</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on CareerPilot Salone could include technical, typographical, or photographic
                errors. CareerPilot Salone does not warrant that any of the materials on its website are accurate,
                complete, or current. We may make changes to the materials at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Sierra Leone,
                and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at info@careerpilot.sl.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
