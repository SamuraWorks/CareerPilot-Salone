export interface Mentor {
    id: string;
    name: string;
    role: string;
    field: string;
    experience: string;
    location: string;
    education: string;
    bio: string;
    image_url: string;
    support_types: string[];
    availability: 'Free' | 'Sponsored' | 'Paid';
    credibility: string;
    insights: string[];
    menteesCount?: number;
}

export const MOCK_MENTORS: Mentor[] = [
    {
        id: 'sengeh',
        name: 'Dr. David Moinina Sengeh',
        role: 'Chief Minister',
        field: 'Technology',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Chief Minister and former Minister of Basic and Senior Secondary Education. MIT and Harvard alumnus. Advocate for innovation, digital skills, and youth inclusion.',
        image_url: '/images/sections/mentors/david_sengeh.jpg',
        support_types: ['Career Strategy', 'Innovation', 'Education Reform', 'Technology', 'Education'],
        availability: 'Sponsored',
        credibility: 'PhD (MIT), Chief Minister of SL',
        insights: [
            'Digital skills are the future of Sierra Leone\'s economy.',
            'Creativity and problem-solving are more important than just certificates.'
        ]
    },
    {
        id: 'salima',
        name: 'Salima Bah',
        role: 'Minister of Communication & Innovation',
        field: 'Technology',
        experience: '10+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Minister of Communication, Technology and Innovation. A lawyer and advocate for digital transformation and youth empowerment in the tech sector.',
        image_url: '/images/sections/mentors/salima_bah.jpg',
        support_types: ['Tech Policy', 'Digital Rights', 'Innovation', 'Technology'],
        availability: 'Sponsored',
        credibility: 'Minister of Innovation, LLB',
        insights: [
            'Technology is an enabler for every sector, from agriculture to health.',
            'Women must take their place at the forefront of our digital revolution.'
        ]
    },
    {
        id: 'yakama',
        name: 'Dr. Yakama Manty Jones',
        role: 'Director of Delivery (Ministry of Finance)',
        field: 'Finance',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Economist, Entrepreneur, and Lecturer. Founder of generic business solutions and expert in development economics.',
        image_url: '/images/sections/mentors/yakama_jones.jpg',
        support_types: ['Economics', 'Entrepreneurship', 'Data Analysis', 'Finance', 'Business'],
        availability: 'Free',
        credibility: 'PhD (Economics), Entrepreneur',
        insights: [
            'Entrepreneurship is about solving problems, not just making money.',
            'Understanding data is crucial for making informed business decisions.'
        ]
    },
    {
        id: 'akisawyerr',
        name: 'Yvonne Aki-Sawyerr OBE',
        role: 'Mayor of Freetown',
        field: 'Business',
        experience: '25+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Mayor of Freetown, specializing in urban transformation, job creation, and climate resilience. Dedicated to community empowerment.',
        image_url: '/images/sections/mentors/yvonne_aki_sawyerr.jpg',
        support_types: ['Leadership', 'Community Impact', 'Entrepreneurship', 'Business', 'Public Service'],
        availability: 'Sponsored',
        credibility: 'Mayor, MSc (LSE)',
        insights: [
            'Data-driven development is key to urban transformation.',
            'Community engagement makes every project sustainable.'
        ]
    },
    {
        id: 'kaifala',
        name: 'Francis Ben Kaifala',
        role: 'ACC Commissioner',
        field: 'Non-Profit',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Commissioner of the Anti-Corruption Commission. Senior Partner at Kaifala, Kanneh & Co. Expert in legal reform and integrity.',
        image_url: '/images/sections/mentors/fbk.jpg',
        support_types: ['Legal Careers', 'Public Integrity', 'Leadership', 'Non-Profit', 'Ethics'],
        availability: 'Free',
        credibility: 'ACC Commissioner, LLM (London)',
        insights: [
            'Integrity is the foundation of any successful career.',
            'Young lawyers must be diligent and tech-savvy.'
        ]
    },
    {
        id: 'kpaka',
        name: 'Dr. Henry Musa Kpaka',
        role: 'Minister of Agriculture',
        field: 'Agriculture',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Minister of Agriculture and Food Security. Economist with a focus on multinational development and food systems.',
        image_url: '/images/sections/mentors/henry_kpaka.jpg',
        support_types: ['Agri-Business', 'Economic Policy', 'Development', 'Agriculture'],
        availability: 'Sponsored',
        credibility: 'Minister, Economist',
        insights: [
            'Agriculture is the engine of growth for Salone.',
            'Food security starts with innovative young farmers.'
        ]
    },
    {
        id: 'demby',
        name: 'Dr. Austin Demby',
        role: 'Minister of Health',
        field: 'Healthcare',
        experience: '30+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Minister of Health. Global health expert with decades of experience in epidemiology and public health systems.',
        image_url: '/images/sections/mentors/austin-demby.jpg',
        support_types: ['Public Health', 'Medical Careers', 'Healthcare Systems', 'Healthcare'],
        availability: 'Sponsored',
        credibility: 'Minister of Health, PhD (Epidemiology)',
        insights: [
            'A healthy nation is a productive nation.',
            'Specialization in healthcare is critical for our future.'
        ]
    },
    {
        id: 'mattai',
        name: 'Julius Daniel Mattai',
        role: 'Minister of Mines',
        field: 'Mining',
        experience: '20+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Minister of Mines and Mineral Resources. Geologist and expert in mineral rights and sector governance.',
        image_url: '/images/sections/mentors/julius-mattai.jpg',
        support_types: ['Geology', 'Mining Governance', 'Extractive Industries', 'Mining', 'Engineering'],
        availability: 'Sponsored',
        credibility: 'Minister, MSc (Geology)',
        insights: [
            'Responsible mining can transform our communities.',
            'We need more young geologists and environmental experts.'
        ]
    },
    {
        id: 'bangura',
        name: 'Sheku Ahmed F. Bangura',
        role: 'Minister of Finance',
        field: 'Finance',
        experience: '30+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Minister of Finance. Expert in economic management and development finance with international experience.',
        image_url: '/images/sections/mentors/sheku_bangura.jpg',
        support_types: ['Financial Management', 'Economic Research', 'Fiscal Policy', 'Finance'],
        availability: 'Sponsored',
        credibility: 'Minister of Finance',
        insights: [
            'Sound fiscal management is key to national stability.',
            'Data literacy is essential for modern finance professionals.'
        ]
    },
    {
        id: 'remoe',
        name: 'Vickie Remoe',
        role: 'Media Entrepreneur',
        field: 'Media',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Host of The Vickie Remoe Show. Branding Expert and advocate for entrepreneurship and storytelling in Salone.',
        image_url: '/images/sections/mentors/vickie_remoe.jpg',
        support_types: ['Branding', 'Media Careers', 'Storytelling', 'Media', 'Business'],
        availability: 'Free',
        credibility: 'Founder, VR&C Marketing',
        insights: [
            'Your brand is the story people tell about you when you are not in the room.',
            'Sierra Leone has so many stories that need to be told professionally.'
        ]
    },
    {
        id: 'idris',
        name: 'Mahmoud Idris',
        role: 'CEO, Smart Systems',
        field: 'Business',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Founder & CEO of Smart Systems. Expert in economic analysis, digital financial services, and investment.',
        image_url: '/images/sections/mentors/mahmoud_idris.jpg',
        support_types: ['Fintech', 'Startup Strategy', 'Investment Analyst', 'Business', 'Technology'],
        availability: 'Free',
        credibility: 'CEO, Ex-Head of Investment (NASSIT)',
        insights: [
            'Digital transformation is creating new wealth in Africa.',
            'Master the basics of business before you scale.'
        ]
    },
    {
        id: 'alpha-bah',
        name: 'Dr. Alpha Bah',
        role: 'Director of ICT, MHEST',
        field: 'Education',
        experience: '20+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Director of ICT at the Ministry of Higher and Technical Education. Expert in digital learning and educational infrastructure.',
        image_url: '/images/sections/mentors/fbk.jpg', // TODO: Replace with actual image of Dr. Alpha Bah (currently using FBK as placeholder)
        support_types: ['Educational Technology', 'Academic Research', 'Career in Academia', 'Education'],
        availability: 'Free',
        credibility: 'Director (MHEST), PhD',
        insights: [
            'Education is moving from chalk and talk to chips and clicks.',
            'Lifelong learning is the only way to stay relevant in the 21st century.'
        ]
    }
];


