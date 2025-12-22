import { Heart, Users, Accessibility, Globe } from 'lucide-react';
import womenEmpowermentImg from '@/assets/women-empowerment.jpg';
import wazeeWellnessImg from '@/assets/wazee-wellness.jpg';

export interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  objectives: string[];
  image: string;
  category: 'health' | 'elderly' | 'disability';
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  quote?: string;
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export const CONTACT_INFO = {
  address: "Argwings Kodhek Road, Hurlingham Plaza, 2nd Floor, Suite 201",
  phone: "0718271543",
  email: "info@a-cw.org",
  location: "Hurlingham, Nairobi, Kenya"
};

export const BANK_DETAILS = {
  mpesa: {
    paybill: "600100",
    account: "Your Name"
  },
  bank: {
    name: "Stanbic Bank",
    branch: "Buruburu Branch",
    swift: "SBICKENX",
    code: "31000",
    accounts: [
      { currency: "KES", number: "0100015791548" },
      { currency: "USD", number: "0100015791556" }
    ]
  }
};

export const PROJECTS: Project[] = [
  {
    id: "women-tech",
    title: "Empowering Women Through Technology-Driven Family Planning Support",
    location: "Homabay, Siaya, Kakamega & Kisumu",
    category: "health",
    description: "Empowering women with digital tools to make informed reproductive health choices. Generating reliable data to inform programming, policy, and resource allocation while strengthening health systems through targeted interventions and partnerships.",
    objectives: [
      "Empowering women with digital tools",
      "Generating reliable data for policy",
      "Strengthening health systems"
    ],
    image: womenEmpowermentImg
  },
  {
    id: "wazee-bora",
    title: "Wazee Bora Centers for Wellness and Wellbeing",
    location: "Homabay, Siaya, Kakamega & Kisumu",
    category: "elderly",
    description: "Improving the wellbeing, health, dignity and livelihood of elderly persons by establishing a community-based Elderly Wellness & Livelihood Support Centre offering integrated nutrition, social engagement, and primary healthcare support.",
    objectives: [
      "Integrated nutrition support",
      "Social engagement & mental well-being",
      "Primary healthcare support"
    ],
    image: wazeeWellnessImg
  },
  {
    id: "silent-skills",
    title: "Silent Skills, Strong Business",
    location: "Western Kenya",
    category: "disability",
    description: "Increasing income, safety, and business success of deaf boda boda riders and deaf market vendors in Western Kenya through entrepreneurship training, digital communication solutions, and signing-friendly business practices.",
    objectives: [
      "Entrepreneurship training",
      "Digital communication solutions",
      "Signing-friendly business practices"
    ],
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80"
  }
];

export const FOUNDERS: Founder[] = [
  {
    name: "Horace Nundu",
    role: "Co-Founder & Director",
    bio: "Horace is a dedicated community leader with over a decade of experience in public health and community development. His passion lies in creating sustainable health systems for marginalized populations. He has spearheaded numerous initiatives focusing on maternal health and disability inclusion across Kenya.",
    quote: "Health is the foundation upon which we build our dreams. Inclusion is the mortar that holds our community together.",
    image: ""
  },
  {
    name: "James Ateng",
    role: "Co-Founder",
    bio: "A passionate advocate for social justice and elderly care, bringing years of expertise in non-profit management and community mobilization. They are driven by a vision of a society where every senior citizen lives with dignity.",
    quote: "We are only as strong as how we treat our most vulnerable.",
    image: ""
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Founders", path: "/founders" },
  { label: "Our Work", path: "/programs" },
  { label: "Projects", path: "/projects" },
  { label: "Get Involved", path: "/get-involved" },
  { label: "Contact", path: "/contact" },
];

export const PILLARS = [
  {
    id: "health",
    title: "Community Health",
    icon: Heart,
    description: "Empowering families with a focus on maternal and child health, nutrition, and digital health access.",
    color: "bg-teal-50 text-teal-600",
    longDescription: "ACW educates expectant mothers on nutrition, prenatal care, safe childbirth practices, and postnatal care. We provide guidance on proper dietary habits, the importance of regular check-ups, and managing pregnancy complications."
  },
  {
    id: "ageism",
    title: "Ageism & Elderly Care",
    icon: Users,
    description: "Fostering social connections, mental well-being, and dignity for our senior citizens through community centers.",
    color: "bg-orange-50 text-orange-600",
    longDescription: "ACW works to raise awareness about ageism, advocating for a society where the elderly are respected, valued, and given opportunities to contribute meaningfully to the community."
  },
  {
    id: "disability",
    title: "Disability Support",
    icon: Accessibility,
    description: "Tailored health support and economic empowerment to ensure inclusivity for persons with disabilities.",
    color: "bg-blue-50 text-blue-600",
    longDescription: "We provide tailored health programs that address the specific needs of individuals with disabilities, including physical therapy, medical assistance, and health education."
  }
];

export const IMPACT_STATS = [
  { label: "Communities Reached", value: "15+", icon: Globe },
  { label: "Elderly Supported", value: "500+", icon: Users },
  { label: "Women Empowered", value: "1,200+", icon: Heart },
  { label: "PWDs Assisted", value: "300+", icon: Accessibility },
];
