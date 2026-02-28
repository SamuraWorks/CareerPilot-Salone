import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import path from "path"

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("Testing with URL:", supabaseUrl)

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
    console.error("Missing credentials")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function runTests() {
    console.log("\n--- Running Supabase Tests ---")
    const testEmail = `test_${Date.now()}@example.com`
    const testPassword = "TestPassword123!"

    try {
        // 1. Test Admin Authentication / User Creation
        console.log("1. Testing User Creation (Admin API)...")
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: testEmail,
            password: testPassword,
            email_confirm: true,
            user_metadata: { full_name: "Test User" }
        })

        if (authError) {
            throw new Error(`Auth Error: ${authError.message}`)
        }
        const userId = authData.user.id
        console.log("   ✅ User created successfully:", userId)

        // Note: The database trigger 'on_auth_user_created' in full_schema.sql SHOULD have created a profile.
        // Let's verify that.

        // Wait a brief moment for trigger to finish
        await new Promise(resolve => setTimeout(resolve, 500))

        console.log("2. Verifying Trigger (Profile Auto-Creation)...")
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (profileError || !profile) {
            console.error("   ❌ Profile trigger failed or table missing.", profileError)
        } else {
            console.log("   ✅ Profile created automatically via trigger!", profile.id)
        }

        // 3. Test Client Login
        console.log("3. Testing Client Login...")
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
        })

        if (loginError) {
            throw new Error(`Login Error: ${loginError.message}`)
        }
        console.log("   ✅ Client Login successful!")

        // Cleanup
        console.log("\nCleaning up test user...")
        await supabaseAdmin.auth.admin.deleteUser(userId)
        console.log("✅ Cleanup complete.")
        console.log("\n🎉 ALL TESTS PASSED! The database is configured correctly.")

    } catch (err: any) {
        console.error("\n❌ TEST FAILED:", err.message)
        console.log("Make sure you have run the full_schema.sql script in your Supabase SQL Editor.")
    }
}

runTests();
