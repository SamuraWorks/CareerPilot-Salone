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
        image_url: '/images/mentors/david_sengeh.jpg',
        support_types: ['Career Strategy', 'Innovation', 'Education Reform'],
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
        image_url: '/images/mentors/salima_bah.jpg',
        support_types: ['Tech Policy', 'Digital Rights', 'Innovation'],
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
        field: 'Economics',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Professional',
        bio: 'Economist, Entrepreneur, and Lecturer. Founder of generic business solutions and expert in development economics.',
        image_url: '/images/mentors/yakama_jones.jpg',
        support_types: ['Economics', 'Entrepreneurship', 'Data Analysis'],
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
        field: 'Public Service',
        experience: '25+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Mayor of Freetown, specializing in urban transformation, job creation, and climate resilience. Dedicated to community empowerment.',
        image_url: 'https://yvonneakisawyerr.com/wp-content/uploads/2023/12/YAS-Mayor.jpg',
        support_types: ['Leadership', 'Community Impact', 'Entrepreneurship'],
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
        field: 'Law',
        experience: '15+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Commissioner of the Anti-Corruption Commission. Senior Partner at Kaifala, Kanneh & Co. Expert in legal reform and integrity.',
        image_url: 'https://www.anticorruption.gov.sl/media/img/commissioner.jpg',
        support_types: ['Legal Careers', 'Public Integrity', 'Leadership'],
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
        image_url: 'https://maf.gov.sl/wp-content/uploads/2023/07/Minister-Kpaka.jpg',
        support_types: ['Agri-Business', 'Economic Policy', 'Development'],
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
        image_url: 'https://mohs.gov.sl/wp-content/uploads/2021/01/Dr.-Austin-Demby.jpg',
        support_types: ['Public Health', 'Medical Careers', 'Healthcare Systems'],
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
        image_url: 'https://mommr.gov.sl/wp-content/uploads/2023/07/Hon-Mattai.jpg',
        support_types: ['Geology', 'Mining Governance', 'Extractive Industries'],
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
        image_url: 'https://mof.gov.sl/wp-content/uploads/2023/07/Hon-Bangura.jpg',
        support_types: ['Financial Management', 'Economic Research', 'Fiscal Policy'],
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
        image_url: 'https://expomediasl.com/wp-content/uploads/2020/01/VickieRemoe_Media_Headshot.jpg',
        support_types: ['Branding', 'Media Careers', 'Storytelling'],
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
        field: 'Entrepreneurship',
        experience: '12+ Years',
        location: 'Sierra Leone',
        education: 'Graduate',
        bio: 'Founder & CEO of Smart Systems. Expert in economic analysis, digital financial services, and investment.',
        image_url: 'https://vickieremoe.com/wp-content/uploads/2021/05/Mahmoud-Idris.jpg',
        support_types: ['Fintech', 'Startup Strategy', 'Investment Analyst'],
        availability: 'Free',
        credibility: 'CEO, Ex-Head of Investment (NASSIT)',
        insights: [
            'Digital transformation is creating new wealth in Africa.',
            'Master the basics of business before you scale.'
        ]
    }
];
