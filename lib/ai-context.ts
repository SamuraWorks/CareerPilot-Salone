
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client (using service role or anon key if public)
// Since we are in an API route, we can use the environment variables directly.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSiteContext(): Promise<string> {
    try {
        // Fetch Top 5 Universities
        const { data: universities } = await supabase
            .from('universities')
            .select('name, location')
            .limit(5);

        // Fetch Top 5 Careers
        const { data: careers } = await supabase
            .from('careers')
            .select('title, salary_range, industry')
            .limit(5);

        // Fetch Top Scholarships
        const { data: scholarships } = await supabase
            .from('scholarships')
            .select('title, amount, deadline')
            .limit(3);

        let context = "Here is the real-time data from the CareerPilot Salone database:\n\n";

        if (universities && universities.length > 0) {
            context += "UNIVERSITIES:\n";
            universities.forEach(uni => {
                context += `- ${uni.name} (${uni.location})\n`;
            });
            context += "\n";
        }

        if (careers && careers.length > 0) {
            context += "POPULAR CAREERS:\n";
            careers.forEach(career => {
                context += `- ${career.title} (${career.industry}). Salary: ${career.salary_range}\n`;
            });
            context += "\n";
        }

        if (scholarships && scholarships.length > 0) {
            context += "ACTIVE SCHOLARSHIPS:\n";
            scholarships.forEach(sch => {
                context += `- ${sch.title}. Amount: ${sch.amount}. Deadline: ${sch.deadline}\n`;
            });
        }

        return context;

    } catch (error) {
        console.error("Error fetching site context:", error);
        return ""; // Fail gracefully
    }
}
