"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  Target,
  FileText,
  BookOpen,
  TrendingUp,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Users,
  User,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [profilePhoto, setProfilePhoto] = useState<string>("")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-lg shadow-lg h-40 sm:h-48 md:h-56">
          <div className="absolute inset-0 z-0">
            <Image src="/dashboard-success.jpg" alt="Dashboard success" fill className="object-cover brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/70" />
          </div>

          <div className="hidden sm:block absolute top-4 right-4 animate-bounce z-10">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="hidden md:block absolute bottom-4 left-4 opacity-20 z-10">
            <Award className="w-16 h-16 text-white" />
          </div>
          <div className="hidden lg:block absolute top-1/2 right-1/4 opacity-10 z-10">
            <Target className="w-20 h-20 text-white" />
          </div>

          <div className="relative z-20 h-full flex items-center justify-between p-4 sm:p-6 md:p-8 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-white truncate">Welcome back, {user?.name || "User"}!</h1>
              <p className="text-sm sm:text-base text-white/90">Continue building your career with CareerPilot Salone</p>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center overflow-hidden flex-shrink-0">
              {profilePhoto ? (
                <img src={profilePhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Career Matches</CardTitle>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold hover:text-primary transition-colors">12</div>
              <p className="text-xs text-muted-foreground mt-1">Recommended for you</p>
              <Progress value={75} className="mt-2 sm:mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-secondary/50 bg-gradient-to-br from-background to-secondary/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Roadmap Progress</CardTitle>
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold hover:text-secondary transition-colors">35%</div>
              <p className="text-xs text-muted-foreground mt-1">3 of 8 milestones completed</p>
              <Progress value={35} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-accent/50 bg-gradient-to-br from-background to-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">CV Completion</CardTitle>
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold hover:text-accent transition-colors">60%</div>
              <p className="text-xs text-muted-foreground mt-1">Add more sections to improve</p>
              <Progress value={60} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <CardTitle>Your Achievements</CardTitle>
            </div>
            <CardDescription>Milestones you've reached on your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Achievement 1 */}
              <div className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border-2 border-primary/20">
                <div className="relative mx-auto mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary mb-1">Account Created</div>
                <div className="text-xs text-muted-foreground">Welcome aboard!</div>
              </div>

              {/* Achievement 2 */}
              <div className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border-2 border-secondary/20">
                <div className="relative mx-auto mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/70 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    5
                  </div>
                </div>
                <div className="text-xs font-semibold text-secondary mb-1">Career Explorer</div>
                <div className="text-xs text-muted-foreground">5 careers viewed</div>
              </div>

              {/* Achievement 3 */}
              <div className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border-2 border-accent/20">
                <div className="relative mx-auto mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    🔥
                  </div>
                </div>
                <div className="text-xs font-semibold text-accent mb-1">First Steps</div>
                <div className="text-xs text-muted-foreground">12 days active</div>
              </div>

              {/* Achievement 4 */}
              <div className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-bl-lg">
                  TOP 20%
                </div>
                <div className="relative mx-auto mb-3 mt-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-xs">
                    ⭐
                  </div>
                </div>
                <div className="text-xs font-semibold text-amber-600 mb-1">Rising Star</div>
                <div className="text-xs text-muted-foreground">Top active user</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Link href="/careers" className="block">
                <div className="flex items-start gap-4 p-4 border-2 border-border rounded-lg hover:bg-primary/5 hover:border-primary transition-all duration-300 group hover:shadow-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      Explore Career Options
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Discover careers that match your skills and interests
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link href="/cv-builder" className="block">
                <div className="flex items-start gap-4 p-4 border-2 border-border rounded-lg hover:bg-secondary/5 hover:border-secondary transition-all duration-300 group hover:shadow-lg">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-secondary transition-colors">Build Your CV</h3>
                    <p className="text-sm text-muted-foreground">Create a professional CV in minutes</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link href="/roadmap" className="block">
                <div className="flex items-start gap-4 p-4 border-2 border-border rounded-lg hover:bg-accent/5 hover:border-accent transition-all duration-300 group hover:shadow-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">View Your Roadmap</h3>
                    <p className="text-sm text-muted-foreground">Follow your personalized learning path</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </Link>

              <Link href="/profile" className="block">
                <div className="flex items-start gap-4 p-4 border-2 border-border rounded-lg hover:bg-primary/5 hover:border-primary transition-all duration-300 group hover:shadow-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-sm">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Keep your skills and preferences current</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on CareerPilot Salone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all cursor-pointer border border-transparent hover:border-primary/20 group">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Viewed Software Developer career</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/5 transition-all cursor-pointer border border-transparent hover:border-secondary/20 group">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Updated CV work experience</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              </div>

              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/5 transition-all cursor-pointer border border-transparent hover:border-accent/20 group">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed roadmap task: Learn HTML Basics</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
