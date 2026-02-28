import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = 'http://localhost:3000';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function runApiTests() {
    console.log("--- Running API Tests for New Auth Architecture ---");
    const testEmail = `new_arch_test_${Date.now()}@example.com`;
    const testPassword = "StrongPassword123!";
    let userId = "";

    try {
        console.log(`\n1. Testing New Signup API...`);
        const signupRes = await axios.post(`${BASE_URL}/api/auth/signup`, {
            email: testEmail,
            password: testPassword
        });

        if (!signupRes.data.success || !signupRes.data.user) {
            throw new Error(`Signup failed: ${JSON.stringify(signupRes.data)}`);
        }
        userId = signupRes.data.user.id;
        console.log("   ✅ Signup API works perfectly! User ID:", userId);

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log(`\n2. Testing New Login API with Email/Password...`);
        const loginEmailRes = await axios.post(`${BASE_URL}/api/login`, {
            email: testEmail,
            password: testPassword
        });

        if (!loginEmailRes.data.success || !loginEmailRes.data.user) {
            throw new Error(`Login failed: ${JSON.stringify(loginEmailRes.data)}`);
        }
        console.log("   ✅ Login API works perfectly!");

        console.log("\n🎉 ALL NEW API ENDPOINTS VERIFIED WITHOUT FAULTS!");

    } catch (error: any) {
        console.error("\n❌ API TEST FAILED!");
        if (error.response) {
            console.error(`Status ${error.response.status}:`, error.response.data);
            console.error("Make sure to run the supabase/schema_v2.sql in your Supabase SQL Editor!");
        } else {
            console.error(error.message);
        }
    } finally {
        if (userId) {
            console.log("\nCleaning up test user...");
            await supabaseAdmin.auth.admin.deleteUser(userId);
            console.log("✅ Cleanup complete.");
        }
    }
}

runApiTests();
