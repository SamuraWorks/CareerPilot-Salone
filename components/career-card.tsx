"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Career } from "@/lib/sample-data"
import { ArrowRight, TrendingUp, DollarSign } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface CareerCardProps {
  career: Career
}

export function CareerCard({ career }: CareerCardProps) {
  const [showUsd, setShowUsd] = useState(false)

  const demandColor = {
    High: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20",
  }

  const demandIcon = {
    High: "🔥",
    Medium: "📈",
    Low: "📊",
  }

  // Calculate percentage for salary visualization
  const getPercentage = () => {
    if (showUsd && career.salaryMinUsd && career.salaryMaxUsd) {
      const max = 2000 // Max USD for scale
      return ((career.salaryMaxUsd / max) * 100).toFixed(0)
    } else if (career.salaryMinLe && career.salaryMaxLe) {
      const max = 40000000 // Max Le for scale (40M)
      return ((career.salaryMaxLe / max) * 100).toFixed(0)
    }
    return "50"
  }

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border-border/50 hover:border-primary/30 hover:-translate-y-1">
      {/* Image with gradient overlay */}
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        <Image
          src={career.imageUrl || "/placeholder.svg"}
          alt={career.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Demand badge on image */}
        <div className="absolute top-3 right-3">
          <Badge className={`${demandColor[career.demand]} backdrop-blur-sm border shadow-lg`} variant="secondary">
            <span className="mr-1">{demandIcon[career.demand]}</span>
            <TrendingUp className="w-3 h-3 mr-1" />
            {career.demand} Demand
          </Badge>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-primary/30">
            {career.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl group-hover:text-primary transition-colors">{career.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{career.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {career.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs py-0.5 px-2 bg-secondary/30">
                  {skill}
                </Badge>
              ))}
              {career.skills.length > 4 && (
                <Badge variant="outline" className="text-xs py-0.5 px-2 bg-secondary/50">
                  +{career.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Salary Section with Visualization */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-3 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Salary Range</p>
              {career.salaryUsd && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowUsd(!showUsd)
                  }}
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  {showUsd ? "Le" : "USD"}
                </Button>
              )}
            </div>

            <p className="text-sm font-bold text-foreground mb-2">
              {showUsd && career.salaryUsd ? career.salaryUsd : career.salary}
            </p>

            {/* Salary visualization bar */}
            {((showUsd && career.salaryMinUsd && career.salaryMaxUsd) ||
              (!showUsd && career.salaryMinLe && career.salaryMaxLe)) && (
                <div className="space-y-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${getPercentage()}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Entry</span>
                    <span>Senior</span>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* View Details Button */}
        <Link href={`/careers/${career.id}`} className="block">
          <Button className="w-full gap-2 group/btn">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
