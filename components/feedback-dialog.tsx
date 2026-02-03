"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Send, Mail, MessageSquare } from "lucide-react"

interface FeedbackDialogProps {
    children: React.ReactNode
}

export function FeedbackDialog({ children }: FeedbackDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        message: "",
        email: "",
        type: "general"
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error("Failed to submit feedback")

            toast.success("Feedback sent successfully! Thank you.")
            setOpen(false)
            setFormData({ message: "", email: "", type: "general" })
        } catch (error) {
            toast.error("Failed to send feedback. Please try email instead.")
        } finally {
            setLoading(false)
        }
    }

    const handleEmailFallback = () => {
        window.location.href = `mailto:careerpilotsalone@gmail.com?subject=CareerPilot Feedback (${formData.type})&body=${encodeURIComponent(formData.message)}`
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#0B1F3A]">
                        <MessageSquare className="w-5 h-5 text-emerald-500" />
                        Share Your Feedback
                    </DialogTitle>
                    <DialogDescription>
                        Help us improve CareerPilot. Report bugs, suggest features, or just say hello!
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Feedback Type</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(val) => setFormData({ ...formData, type: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">Data Issues</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                                <SelectItem value="bug">Bug Report</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us what's on your mind..."
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="resize-none min-h-[100px]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="For follow-up contact"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={handleEmailFallback}
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Use Email App
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-[#0B1F3A] hover:bg-slate-800"
                            disabled={loading || !formData.message.trim()}
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                            Send Feedback
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
