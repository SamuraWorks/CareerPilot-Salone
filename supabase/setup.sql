-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- DROP EXISTING TABLES TO PREVENT SCHEMA CONFLICTS
-- This ensures we start with a clean slate and correct columns
DROP TABLE IF EXISTS public.careers CASCADE;
DROP TABLE IF EXISTS public.universities CASCADE;
DROP TABLE IF EXISTS public.jobs CASCADE;
DROP TABLE IF EXISTS public.scholarships CASCADE;
DROP TABLE IF EXISTS public.mentors CASCADE;

-- 1. CAREERS TABLE
create table if not exists public.careers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  skills text[],
  salary_range text, -- Display format in Le (e.g., "Le 5,000,000 - 15,000,000")
  salary_range_usd text, -- Display format in USD (e.g., "$225 - $680")
  salary_min_le numeric, -- Minimum salary in Leones for charts
  salary_max_le numeric, -- Maximum salary in Leones for charts
  salary_min_usd numeric, -- Minimum salary in USD for charts
  salary_max_usd numeric, -- Maximum salary in USD for charts
  demand_level text, -- 'High', 'Medium', 'Low'
  category text,
  image_url text,
  educational_paths jsonb, -- Stores array of {name, institution, type, cost, url}
  created_at timestamptz default now()
);

alter table public.careers enable row level security;

create policy "Allow public read access on careers"
  on public.careers for select
  using (true);

-- Seed Careers (Real context with dual currency)
-- Exchange rate: 1 USD ≈ 22,000 Le (approximate)
insert into public.careers (title, description, skills, salary_range, salary_range_usd, salary_min_le, salary_max_le, salary_min_usd, salary_max_usd, demand_level, category, image_url, educational_paths)
values
-- TECHNOLOGY
('Software Developer', 'Build and maintain software systems for local and international markets.', ARRAY['JavaScript', 'Python', 'React', 'SQL'], 'Le 5,000,000 - 15,000,000', '$225 - $680', 5000000, 15000000, 225, 680, 'High', 'Technology', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', 
  '[
    {"name": "BSc Computer Science", "institution": "Njala University", "type": "University", "cost": "Standard Tuition", "url": "https://njala.edu.sl"},
    {"name": "BSc Information Technology", "institution": "Limkokwing University", "type": "University", "cost": "Standard Tuition", "url": "https://www.limkokwing.net/sierraleone"},
    {"name": "CS50: Introduction to Computer Science", "institution": "Harvard (via edX)", "type": "Online", "cost": "Free", "url": "https://www.edx.org/cs50"},
    {"name": "Meta Front-End Developer Certificate", "institution": "Coursera", "type": "Online", "cost": "Financial Aid Available", "url": "https://www.coursera.org"}
  ]'::jsonb
),
('Data Analyst', 'Interpret complex data to help companies make better decisions.', ARRAY['Excel', 'SQL', 'PowerBI', 'Statistics'], 'Le 4,000,000 - 10,000,000', '$180 - $455', 4000000, 10000000, 180, 455, 'High', 'Technology', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 
  '[
    {"name": "BSc Information Systems", "institution": "IPAM (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl/ipam"},
    {"name": "Google Data Analytics Certificate", "institution": "Google (Coursera)", "type": "Online", "cost": "Financial Aid Available", "url": "https://www.coursera.org/professional-certificates/google-data-analytics"}
  ]'::jsonb
),

-- HEALTHCARE
('Medical Doctor', 'Diagnose and treat illnesses, saving lives in hospitals and clinics.', ARRAY['Medicine', 'Patient Care', 'Diagnosis', 'Surgery'], 'Le 15,000,000 - 40,000,000', '$680 - $1,820', 15000000, 40000000, 680, 1820, 'High', 'Healthcare', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d', 
  '[
    {"name": "MBChB (Medicine & Surgery)", "institution": "COMAHS (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl/comahs"},
    {"name": "Introduction to Global Health", "institution": "Coursera", "type": "Online", "cost": "Free", "url": "https://www.coursera.org"}
  ]'::jsonb
),
('Nurse', 'Provide healthcare services in hospitals and community centers.', ARRAY['Patient Care', 'First Aid', 'Health Education'], 'Le 2,500,000 - 6,000,000', '$115 - $275', 2500000, 6000000, 115, 275, 'High', 'Healthcare', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
  '[
    {"name": "BSc Nursing", "institution": "COMAHS (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl"},
    {"name": "State Enrolled Community Health Nurse", "institution": "School of Midwifery", "type": "Vocational", "cost": "Variable", "url": "#"}
  ]'::jsonb
),
('Public Health Officer', 'Work with communities to prevent disease and promote health.', ARRAY['Epidemiology', 'Community Outreach', 'Research'], 'Le 4,000,000 - 9,000,000', '$180 - $410', 4000000, 9000000, 180, 410, 'High', 'Healthcare', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7', 
  '[
    {"name": "BSc Public Health", "institution": "Njala University", "type": "University", "cost": "Standard Tuition", "url": "https://njala.edu.sl"},
    {"name": "Global Health Project Management", "institution": "Coursera", "type": "Online", "cost": "Financial Aid", "url": "https://www.coursera.org"}
  ]'::jsonb
),

-- ENGINEERING & MINING
('Civil Engineer', 'Design and oversee construction of infrastructure projects like roads and bridges.', ARRAY['Structural Analysis', 'CAD', 'Project Management'], 'Le 6,000,000 - 20,000,000', '$275 - $910', 6000000, 20000000, 275, 910, 'High', 'Engineering', 'https://images.unsplash.com/photo-1581094794329-cd1361ddee25',
  '[
    {"name": "B.Eng Civil Engineering", "institution": "Fourah Bay College (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl"},
    {"name": "B.Eng Civil Engineering", "institution": "Unimak", "type": "University", "cost": "Standard Tuition", "url": "https://unimak.edu.sl"}
  ]'::jsonb
),
('Mining Engineer', 'Plan and manage extraction of minerals from the earth.', ARRAY['Geology', 'Safety Management', 'Exploration'], 'Le 10,000,000 - 30,000,000', '$455 - $1,365', 10000000, 30000000, 455, 1365, 'High', 'Engineering', 'https://images.unsplash.com/photo-1534954477380-6bc65b8287e0', 
  '[
    {"name": "B.Eng Mining Engineering", "institution": "Fourah Bay College (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl"}
  ]'::jsonb
),

-- BUSINESS & FINANCE
('Accountant', 'Manage financial records and ensure compliance for businesses.', ARRAY['Accounting', 'Auditing', 'Tax Law', 'Excel'], 'Le 5,000,000 - 15,000,000', '$225 - $680', 5000000, 15000000, 225, 680, 'High', 'Finance', 'https://images.unsplash.com/photo-1554224155-98406852d009', 
  '[
    {"name": "BSc Applied Accounting", "institution": "IPAM (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl/ipam"},
    {"name": "ACCA Foundation", "institution": "Various Institutes", "type": "Vocational", "cost": "Exam Fees", "url": "https://www.accaglobal.com"}
  ]'::jsonb
),
('Financial Analyst', 'Analyze financial data to guide business investment decisions.', ARRAY['Financial Modeling', 'Economics', 'Risk Assessment'], 'Le 8,000,000 - 20,000,000', '$365 - $910', 8000000, 20000000, 365, 910, 'Medium', 'Finance', 'https://images.unsplash.com/photo-1560472324-cf11da8cce51', 
  '[
    {"name": "BSc Banking and Finance", "institution": "IPAM (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl/ipam"}
  ]'::jsonb
),
('Digital Marketer', 'Manage social media and online campaigns for businesses.', ARRAY['Social Media', 'SEO', 'Content Creation'], 'Le 3,000,000 - 7,000,000', '$135 - $320', 3000000, 7000000, 135, 320, 'Medium', 'Marketing', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  '[
    {"name": "BSc Business Administration (Marketing)", "institution": "IPAM (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl/ipam"},
    {"name": "Google Digital Marketing & E-commerce Certificate", "institution": "Google (Coursera)", "type": "Online", "cost": "Financial Aid Available", "url": "https://www.coursera.org"}
  ]'::jsonb
),

-- LAW & GOVERNANCE
('Lawyer', 'Advocate for clients and provide legal advice.', ARRAY['Legal Research', 'Public Speaking', 'Critical Thinking'], 'Le 8,000,000 - 25,000,000', '$365 - $1,135', 8000000, 25000000, 365, 1135, 'High', 'Law', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73', 
  '[
    {"name": "LLB (Hons) Law", "institution": "Fourah Bay College (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl"},
    {"name": "LLB (Hons) Law", "institution": "Unimak", "type": "University", "cost": "Standard Tuition", "url": "https://unimak.edu.sl"}
  ]'::jsonb
),

-- AGRICULTURE
('Agricultural Specialist', 'Improve farming techniques and crop production in the provinces.', ARRAY['Crop Science', 'Soil Analysis', 'Irrigation Management'], 'Le 3,000,000 - 8,000,000', '$135 - $365', 3000000, 8000000, 135, 365, 'High', 'Agriculture', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
  '[
    {"name": "BSc Agriculture", "institution": "Njala University", "type": "University", "cost": "Standard Tuition", "url": "https://njala.edu.sl"},
    {"name": "Sustainable Agricultural Land Management", "institution": "Coursera", "type": "Online", "cost": "Free", "url": "https://www.coursera.org"}
  ]'::jsonb
),

-- MEDIA & ARTS
('Journalist', 'Investigate and report news for print, broadcast, or online media.', ARRAY['Writing', 'Interviewing', 'Ethics', 'Research'], 'Le 3,000,000 - 8,000,000', '$135 - $365', 3000000, 8000000, 135, 365, 'Medium', 'Media', 'https://images.unsplash.com/photo-1504711434969-e33886168f5c', 
  '[
    {"name": "BA Mass Communication", "institution": "Fourah Bay College (USL)", "type": "University", "cost": "Standard Tuition", "url": "https://usl.edu.sl"},
    {"name": "BA Mass Communication", "institution": "Unimak", "type": "University", "cost": "Standard Tuition", "url": "https://unimak.edu.sl"},
    {"name": "Journalism AI & Data", "institution": "Knight Center (Online)", "type": "Online", "cost": "Free", "url": "https://knightcenter.utexas.edu/"}
  ]'::jsonb
);

-- 2. UNIVERSITIES TABLE
create table if not exists public.universities (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  location text,
  website_url text,
  logo_url text,
  popular_courses text[],
  created_at timestamptz default now()
);

alter table public.universities enable row level security;

create policy "Allow public read access on universities"
  on public.universities for select
  using (true);

-- Seed Universities (Real Sierra Leone Unis)
insert into public.universities (name, location, website_url, logo_url, popular_courses)
values
('Fourah Bay College (USL)', 'Mount Aureol, Freetown', 'https://usl.edu.sl', '/images/universities/fbc.jpg', ARRAY['Engineering', 'Law', 'Arts', 'Political Science']),
('Njala University', 'Njala, Moyamba District', 'https://njala.edu.sl', '/images/universities/njala.jpg', ARRAY['Agriculture', 'Environmental Science', 'Education', 'Technology']),
('University of Makeni (UNIMAK)', 'Makeni', 'https://unimak.edu.sl', '/images/universities/unimak.png', ARRAY['Development Studies', 'Computer Science', 'Commerce', 'Mass Communication']),
('Limkokwing University', 'Freetown', 'https://www.limkokwing.net/sierraleone', '/images/universities/limkokwing.jpg', ARRAY['Creative Technology', 'Design', 'Information Technology']),
('IPAM (Institute of Public Administration and Management)', 'Tower Hill, Freetown', 'https://usl.edu.sl/ipam', '/images/universities/ipam.jpg', ARRAY['Business Administration', 'Accounting', 'Financial Services', 'Governance']);


-- 3. JOBS TABLE
create table if not exists public.jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text,
  salary_range text,
  type text, -- 'Full-time', 'Part-time', 'Internship'
  application_link text,
  requirements text[],
  posted_at timestamptz default now()
);

alter table public.jobs enable row level security;

create policy "Allow public read access on jobs"
  on public.jobs for select
  using (true);

-- Seed Jobs (Realistic examples)
insert into public.jobs (title, company, location, salary_range, type, application_link, requirements)
values
('Senior Accountant', 'Rokel Commercial Bank', 'Freetown', 'Le 80,000,000 / year', 'Full-time', 'https://rokelbank.sl/careers', ARRAY['ACCA', '5+ years experience', 'Banking knowledge']),
('IT Support Officer', 'Africell Sierra Leone', 'Freetown', 'Le 4,000,000 / month', 'Full-time', 'https://www.africell.sl/careers', ARRAY['Networking', 'Hardware Troubleshooting', 'Customer Service']),
('Project Coordinator', 'World Vision', 'Bo', 'Competitive', 'Contract', 'https://careers.wvi.org/jobs/sierra-leone', ARRAY['Project Management', 'Development background', 'Report writing']),
('Sales Representative', 'Orange Sierra Leone', 'Kenema', 'Commission based', 'Part-time', 'https://www.orange.sl', ARRAY['Sales skills', 'Communication', 'Local knowledge']);


-- 4. SCHOLARSHIPS TABLE
create table if not exists public.scholarships (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  provider text not null,
  amount text,
  deadline date,
  application_link text,
  eligibility_criteria text,
  created_at timestamptz default now()
);

alter table public.scholarships enable row level security;

create policy "Allow public read access on scholarships"
  on public.scholarships for select
  using (true);

-- Seed Scholarships
insert into public.scholarships (title, provider, amount, deadline, application_link, eligibility_criteria)
values
('Sierra Leone Government Grant-in-Aid', 'Ministry of Technical and Higher Education (MTHE)', 'Full Tuition Payment', '2025-06-30', 'https://mthe.gov.sl', 'Must be a registered student in a recognized tertiary institution with a min GPA of 3.0.'),
('Chinese Government Scholarship', 'Govt of China / MOFCOM', 'Full Tuition + Accommodation + Stipend', '2025-03-31', 'https://www.campuschina.org', 'Undergraduate, Masters & PhD. Must be under 25 (BS), 35 (MS), 40 (PhD).'),
('Chevening Scholarship', 'UK Government (FCDO)', 'Full Funding + Flights + Stipend', '2025-11-05', 'https://www.chevening.org/scholarship/sierra-leone/', 'Two years work experience, leadership potential, promise to return to SL.'),
('Commonwealth Master’s Scholarship', 'Commonwealth Scholarship Commission', 'Full Tuition + Stipend + Airfare', '2025-10-18', 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/', 'Upper second class honors degree, citizen of commonwealth country.'),
('MasterCard Foundation Scholars Program', 'MasterCard Foundation', 'Comprehensive Scholarship', '2025-02-28', 'https://mastercardfdn.org/all/scholars/', 'Academic talent, commitment to giving back to community, leadership potential.'),
('Fulbright Foreign Student Program', 'US Department of State', 'Full Funding for Master’s/PhD', '2025-04-15', 'https://sl.usembassy.gov/education-culture/', 'Outstanding academic record, strong English proficiency, GRE required for some fields.');


-- 5. MENTORS TABLE
create table if not exists public.mentors (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  profession text not null,
  bio text,
  image_url text,
  calendly_link text, -- For automated booking if available
  contact_email text, -- For direct email requests
  created_at timestamptz default now()
);

alter table public.mentors enable row level security;

create policy "Allow public read access on mentors"
  on public.mentors for select
  using (true);

-- Seed Mentors (REAL & TRUSTED FIGURES)
insert into public.mentors (name, profession, bio, image_url, calendly_link, contact_email)
values
('Dr. David Moinina Sengeh', 'Chief Minister (Sierra Leone)', 'Award-winning innovation leader, former Minister of Basic and Senior Secondary Education. Passionate about youth empowerment and technology.', '/images/mentors/david_sengeh.jpg', 'https://calendly.com/david-sengeh-public', 'office@chiefminister.gov.sl'),
('Salima Monorma Bah', 'Minister of Communication, Technology & Innovation', 'Driving digital transformation in Sierra Leone. Advocate for women in tech and digital literacy.', '/images/mentors/salima_bah.jpg', 'https://calendly.com/salima-bah-mentorship', 'minister@moci.gov.sl'),
('Dr. Yakama Manty Jones', 'Economist & Delivery Team Lead', 'Expert in development economics, data systems, and human capital development.', '/images/mentors/yakama_jones.jpg', 'https://calendly.com/yakama-jones', 'info@yakamajones.com');
