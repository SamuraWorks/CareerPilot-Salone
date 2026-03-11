"use client"

import { useState, useRef } from "react"
import { Camera, Loader2, Upload, X, User } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { useProfile } from "@/lib/profile-context"
import { toast } from "sonner"

export function ProfileImageUpload() {
    const { user } = useAuth()
    const { profile, updateProfile } = useProfile()
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFile = async (file: File) => {
        if (!user) {
            toast.error("Please log in to upload a photo.")
            return
        }

        // Validate type
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed.")
            return
        }

        // Validate size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be smaller than 5MB.")
            return
        }

        // Show local preview immediately
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("userId", user.id)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || "Upload failed")
            }

            // Cache-bust the URL
            const finalUrl = `${result.publicUrl}?t=${Date.now()}`
            await updateProfile({ avatar_url: finalUrl })
            toast.success("Profile photo updated!")
        } catch (error: any) {
            toast.error(error.message || "Error uploading photo")
            setPreview(null) // Revert preview on error
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
        // Reset input so same file can be re-selected
        e.target.value = ""
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    const currentAvatarUrl = preview || profile?.avatar_url
    const initials = profile?.full_name?.substring(0, 2).toUpperCase() || "ME"

    return (
        <div
            className="relative group"
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            {/* Avatar Circle */}
            <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl overflow-hidden relative bg-slate-100 flex items-center justify-center cursor-pointer transition-all duration-200
                    ${isDragging ? "border-emerald-400 scale-105 ring-4 ring-emerald-200" : "border-white group-hover:border-emerald-300"}`}
                onClick={() => inputRef.current?.click()}
                title="Click or drag an image to upload"
            >
                {currentAvatarUrl ? (
                    <Image
                        src={currentAvatarUrl}
                        alt="Profile photo"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <span className="text-2xl font-bold text-slate-300 select-none">
                        {initials}
                    </span>
                )}

                {/* Hover Overlay */}
                {!uploading && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                        <Upload className="w-5 h-5 text-white" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                            {currentAvatarUrl ? "Change" : "Upload"}
                        </span>
                    </div>
                )}

                {/* Uploading Overlay */}
                {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                    </div>
                )}
            </div>

            {/* Camera Badge */}
            <label
                className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-all active:scale-95 z-10"
                title="Upload photo"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
            >
                <Camera className="w-4 h-4" />
            </label>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />

            {/* Drag hint */}
            {isDragging && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
                    Drop to upload
                </div>
            )}
        </div>
    )
}
