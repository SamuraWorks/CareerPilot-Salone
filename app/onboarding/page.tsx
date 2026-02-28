"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import { ResearchQuestionnaire } from "@/components/dashboard/research-questionnaire"
import { Loader2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { isLoadingAuth } = useAuth()
  const { profile } = useProfile()

  useEffect(() => {
    if (profile?.is_complete) {
      router.push('/dashboard')
    }
  }, [profile?.is_complete, router])

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mb-4" />
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Initializing Workspace</h2>
        <p className="text-slate-500 text-sm mt-2">Preparing your secure environment...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 shadow-inner">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <Image src="/images/core/logo.png" alt="Logo" width={56} height={56} className="rounded-xl shadow-md mb-6" />
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighttext-center">Welcome Aboard!</h1>
          <p className="text-slate-500 mt-2 text-center">Let's set up your profile to give you the best AI insights.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
          <ResearchQuestionnaire
            isOnboardingMode={true}
            forceVisible={true}
            onSaveSuccess={() => {
              router.push('/dashboard?init_ai=true');
            }}
          />
        </div>

        {/* Footer Branded */}
        <div className="text-center mt-12 pb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            CareerPilot Salone • Secure & Anonymous
          </p>
        </div>
      </div>
    </div>
  )
}
