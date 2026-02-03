import { SIERRA_LEONE_CAREERS, INSTITUTIONS } from './career-data';
import { SIERRA_LEONE_OPPORTUNITIES } from './sierra-leone-opportunities';

export async function getSiteContext(): Promise<string> {
    const careersSummary = SIERRA_LEONE_CAREERS.slice(0, 5).map(c =>
        `- ${c.title} (${c.industry}). Salary: ${c.salaryUSD}`
    ).join('\n');

    const universitiesSummary = INSTITUTIONS.slice(0, 5).map(u => `- ${u}`).join('\n');

    const recentJobs = SIERRA_LEONE_OPPORTUNITIES
        .filter(o => o.type === 'job')
        .slice(0, 3)
        .map(j => `- ${j.title} at ${j.organization} (Deadline: ${j.deadline || 'N/A'})`)
        .join('\n');

    const activeScholarships = SIERRA_LEONE_OPPORTUNITIES
        .filter(o => o.type === 'scholarship')
        .slice(0, 3)
        .map(s => `- ${s.title} (Deadline: ${s.deadline || 'N/A'})`)
        .join('\n');

    return `Here is the real-time data from the CareerPilot Salone database:

UNIVERSITIES:
${universitiesSummary}

POPULAR CAREERS:
${careersSummary}

ACTIVE SCHOLARSHIPS:
${activeScholarships}

RECENT JOB OPENINGS:
${recentJobs}
`;
}
