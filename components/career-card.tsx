"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CareerInfo } from "@/lib/career-data"
import { ArrowRight, TrendingUp, DollarSign, Target, Sparkles, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CareerCardProps {
  career: CareerInfo
}

export function CareerCard({ career }: CareerCardProps) {
  const [showUsd, setShowUsd] = useState(false)

  const demandColor: Record<string, string> = {
    High: "bg-emerald-500/10 text-[#1FA774] border-[#1FA774]/20",
    Medium: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    Low: "bg-slate-500/10 text-slate-700 border-slate-500/20",
  }

  const demandIcon: Record<string, string> = {
    High: "🔥",
    Medium: "📈",
    Low: "📊",
  }

  const getPercentage = () => {
    // Basic visualization of salary potential
    if (career.demand === "High") return "85";
    if (career.demand === "Medium") return "60";
    return "40";
  }

  return (
    <Card className="group hover:shadow-[0_20px_50px_rgba(11,31,58,0.15)] transition-all duration-500 overflow-hidden h-full flex flex-col border-slate-100 rounded-[2.5rem] bg-white hover:-translate-y-2">
      {/* Image with gradient overlay */}
      <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
        <Image
          src={career.image || "/images/sections/careers/software-developer.png"}
          alt={career.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle background overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.05] grayscale pointer-events-none">
          <Image
            src={`/images/sections/careers/${career.industry.toLowerCase().includes('tech') ? 'technology' :
              career.industry.toLowerCase().includes('agri') ? 'agriculture' :
                career.industry.toLowerCase().includes('health') ? 'healthcare' :
                  career.industry.toLowerCase().includes('finan') ? 'finance' :
                    career.industry.toLowerCase().includes('edu') ? 'education' :
                      career.industry.toLowerCase().includes('min') ? 'mining' : 'workspace'}.png`}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Demand badge */}
        <div className="absolute top-4 right-4">
          <Badge className={`${demandColor[career.demand] || demandColor.Medium} backdrop-blur-md border shadow-lg font-bold font-sans py-1 px-3 rounded-full`} variant="secondary">
            {demandIcon[career.demand] || demandIcon.Medium} {career.demand} Demand
          </Badge>
        </div>

        {/* Industry Label */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className="bg-black/40 backdrop-blur-md border-white/20 text-white font-bold font-sans text-[10px] uppercase tracking-[0.2em] px-3 py-1">
            {career.industry}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-6 pb-2 space-y-2">
        <CardTitle className="text-2xl font-bold font-sans text-[#0B1F3A] group-hover:text-[#1FA774] transition-colors leading-tight">
          {career.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm font-medium font-sans text-slate-500 leading-relaxed">
          {career.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Key Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Skills</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills.slice(0, 3).map((skill) => (
                <div key={skill} className="text-[11px] font-bold py-1.5 px-3 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
                  {skill}
                </div>
              ))}
              {career.requiredSkills.length > 3 && (
                <div className="text-[11px] font-black py-1.5 px-3 bg-white text-[#1FA774] rounded-lg border border-[#1FA774]/20 shadow-sm">
                  +{career.requiredSkills.length - 3} more
                </div>
              )}
            </div>
          </div>

          {/* New Salary Analysis Visual */}
          <div className="bg-[#f8fafc] rounded-3xl p-5 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#1FA774]" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Outlook</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold font-sans text-[#0B1F3A]">
                {career.salaryRange}
              </p>

              <div className="space-y-1">
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#1FA774] transition-all duration-1000"
                    style={{ width: `${getPercentage()}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Entry</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link href={`/careers/${career.id}`} className="block">
          <Button className="w-full h-14 bg-[#0B1F3A] hover:bg-[#1A3355] text-white rounded-2xl font-bold font-sans shadow-lg group/btn gap-3 transition-all">
            <span>Analyze Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}


