"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Camera, Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

export function ProfileImageUpload() {
    const { profile, updateProfile, user } = useAuth()
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.")
            }

            if (!user) {
                throw new Error("Please log in to upload an image.")
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${user.id}/avatar.${fileExt}` // Overwrite same file to save space/complexity

            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true })

            if (uploadError) {
                throw uploadError
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // 3. Update Profile
            // Add a timestamp to bust cache if needed
            const finalUrl = `${publicUrl}?t=${Date.now()}`

            await updateProfile({ avatar_url: finalUrl })
            toast.success("Profile photo updated!")

        } catch (error: any) {
            toast.error(error.message || "Error uploading image")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden relative bg-slate-100 flex items-center justify-center">
                {profile.avatar_url ? (
                    <Image
                        src={profile.avatar_url}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                ) : (
                    <span className="text-2xl font-bold text-slate-300">
                        {profile.full_name?.substring(0, 2).toUpperCase() || "ME"}
                    </span>
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}
            </div>

            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Camera className="w-4 h-4" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    disabled={uploading}
                />
            </label>
        </div>
    )
}
