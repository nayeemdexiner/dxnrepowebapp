import { ContactInfo, EducationItem, ExperienceItem, ProjectItem, ServiceItem, SkillCategory, SocialMediaItem, StatItem } from '../types';
import { userImageDataUri } from './userImageBase64';

export const personalData = {
  name: 'Muhammad NAYEEM',
  shortName: 'NAYEEM',
  title: 'Senior CNC Programmer & Creative Designer',
  subtitle: 'Lead CNC Programmer & Computerized Design Specialist',
  tagline: 'Engineering the intersection of industrial precision, CNC programming & digital aesthetics.',
  bio: 'A multidisciplinary Senior CNC Programmer & Computerized Design Specialist based in Bangladesh. I architect millimeter-accurate industrial CNC manufacturing files, 2D/3D CAD toolpaths, high-performance responsive web applications, and futuristic brand identities.',
  
  // Exact photo of Muhammad Nayeem in black suit, sunglasses, black tie embedded directly
  profileImage: userImageDataUri,
  portraitImage: userImageDataUri,
  coverImage: userImageDataUri,
  fallbackImage: userImageDataUri,
  
  // Personal Details
  details: {
    location: 'Hajiganj, Chandpur, Bangladesh',
    nationality: 'Bangladeshi',
    birthday: '30 September 2006',
    gender: 'Male',
    height: '5 Feet 6 Inch',
    maritalStatus: 'Unmarried',
    careerObjective: 'To build a successful and respectable career through hard work, dedication and continuous learning while achieving both personal and professional growth.',
  },

  whatIDo: [
    { title: 'Frontend & Web Development', desc: 'Building responsive, ultra-fast web applications using React, TypeScript, and modern styling.' },
    { title: 'UI/UX Interface Design', desc: 'Designing futuristic dark-mode interfaces, interactive design systems, and glassmorphic dashboards.' },
    { title: 'CNC Machine Programming', desc: 'Precision 2D/3D toolpath creation, CAD/CAM drafting, and architectural woodwork relief modeling.' },
    { title: 'Graphic & Brand Identity', desc: 'Crafting minimalist logos, vector art, high-impact marketing posters, and social campaigns.' },
    { title: 'Computerized Design Specialist', desc: 'Automating digital workflows, precision vector conversions, and technical drafting.' },
    { title: 'Digital Operations', desc: 'Data management, computerized administration, and advanced web research.' },
  ],

  mindset: [
    { title: 'Continuous Learner', desc: 'Constantly absorbing modern frameworks, design principles, and engineering methodologies.' },
    { title: 'Creator & Innovator', desc: 'Transforming abstract conceptual ideas into tangible, high-converting digital products.' },
    { title: 'Problem Solver', desc: 'Engineering bulletproof solutions for complex UI logic and CNC manufacturing constraints.' },
    { title: 'Technology Enthusiast', desc: 'Deeply passionate about modern web technologies, AI workflows, and automated design systems.' },
    { title: 'Detail Oriented', desc: 'Obsessed with pixel-perfect alignments, fluid 60fps animations, and micrometer tolerances.' },
  ],

  interests: [
    'Web Architecture & React Ecosystem',
    'Futuristic UI/UX & Motion Prototyping',
    'CNC Woodcraft & 3D Architectural Reliefs',
    'Vector Illustration & Typography',
    'Emerging AI Tools & Automation',
    'Digital Product Strategy',
  ]
};

export const educationData: EducationItem[] = [
  {
    id: 'bsc',
    degree: 'B.Sc in Science (Running)',
    institution: 'Hajiganj Model Government College',
    year: 'Present (Running)',
    status: 'Running',
    group: 'Science',
    description: 'Pursuing undergraduate degree in Science with strong focus on analytical computing, mathematical modeling, and systematic thinking.',
    highlights: [
      'Focusing on computational problem solving & mathematics',
      'Active participant in institutional science and technology seminars',
      'Combining theoretical scientific principles with real-world digital design'
    ]
  },
  {
    id: 'hsc',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Hajiganj Model Government College',
    year: '2023',
    status: 'Completed',
    gpa: '3.67',
    board: 'Cumilla',
    group: 'Science',
    description: 'Completed higher secondary education in the Science stream with high competencies in Physics, Chemistry, and Higher Mathematics.',
    highlights: [
      'Achieved GPA 3.67 / 5.00 under Cumilla Education Board',
      'Strengthened foundational analytical and algorithmic reasoning',
      'Practical lab experiences in computerized computational calculations'
    ]
  },
  {
    id: 'ssc',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Hajiganj Amin Memorial High School',
    year: '2021',
    status: 'Completed',
    gpa: '4.28',
    board: 'Cumilla',
    group: 'Science',
    description: 'Successfully graduated secondary school education in Science with stellar grades in General Science and Information Technology.',
    highlights: [
      'Achieved GPA 4.28 / 5.00 in Science division',
      'Received distinction for computer studies and mathematics',
      'Led student tech study groups and organized school cultural events'
    ]
  },
  {
    id: 'jsc',
    degree: 'Junior School Certificate (JSC)',
    institution: 'Hajiganj Amin Memorial High School',
    year: '2018',
    status: 'Completed',
    gpa: '4.71',
    board: 'Cumilla',
    group: 'General',
    description: 'Passed Junior School Certificate examination with near-perfect distinction grade under Cumilla Board.',
    highlights: [
      'Secured Outstanding GPA 4.71 / 5.00',
      'Top tier ranking across institution student body',
      'Awarded merit certificate for academic excellence'
    ]
  },
  {
    id: 'psc',
    degree: 'Primary School Certificate (PSC)',
    institution: 'Dowaliya Primary School',
    year: '2015',
    status: 'Completed',
    gpa: '4.83',
    board: 'Primary Education Board',
    group: 'General',
    description: 'Completed primary education with highest academic honor and distinction.',
    highlights: [
      'Achieved exceptional GPA 4.83 / 5.00',
      'Primary scholarship examinee with stellar math results',
      'First rank in regional talent assessment contest'
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Independent Studio & Technical Practice',
    role: 'Senior Computerized Numerical Control Programmer & Designer',
    period: '2022 — Present (3+ Years)',
    location: 'Hajiganj, Chandpur, Bangladesh',
    description: 'Directing computerized design, 2D/3D CAD vectorization, and multi-axis CNC machine programming for luxury architectural woodwork and structural relief carvings.',
    responsibilities: [
      'Engineered and programmed 150+ high-precision 2D/3D CNC vector toolpaths and relief carving files using CAD/CAM software.',
      'Programmed multi-axis industrial CNC routers with zero-tolerance precision, optimizing spindle feeds, speeds, and tool life.',
      'Transformed intricate client sketches and conceptual artwork into scalable computerized vectors.',
      'Supervised technical computerized documentation, job routing, inventory sheets, and digital billing pipelines.',
      'Collaborated closely with interior architects to engineer bespoke wooden doors, 3D jali screens, and ornamental panels.'
    ],
    technologies: ['CNC ArtCAM', 'Vectric Aspire', 'AutoCAD 2D/3D', 'Adobe Illustrator', 'Photoshop', 'G-Code Optimization'],
    highlight: 'Successfully delivered 100+ bespoke architectural woodcarving projects with 99.8% precision rate.'
  },
  {
    id: 'exp-2',
    company: 'Freelance & Studio Practice',
    role: 'Frontend Developer & UI/UX Designer',
    period: '2023 — Present',
    location: 'Remote / Global',
    description: 'Designing and building modern responsive websites, interactive single page web applications, vector logos, and social media brand identity packages for international and local clients.',
    responsibilities: [
      'Architected responsive frontend websites using React, Tailwind CSS, TypeScript, and modern animation libraries.',
      'Created custom vector logos, brand guidelines, and high-impact social media marketing creative sets.',
      'Conducted user flow prototyping, wireframing, and interactive UI mockups in Figma.',
      'Delivered turn-key web solutions with SEO best practices, lighting-fast performance, and accessible design.'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Adobe Creative Cloud', 'Git / GitHub'],
    highlight: 'Maintained 100% on-time delivery across web development and creative graphic projects.'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Web & Frontend Development',
    description: 'Modern web development technologies for building responsive, fast, and interactive user interfaces.',
    skills: [
      { name: 'HTML5 & Semantic Markup', level: 98, experience: '3+ Years', tag: 'Expert' },
      { name: 'CSS3 & Tailwind CSS', level: 95, experience: '3+ Years', tag: 'Modern Styling' },
      { name: 'JavaScript (ES6+)', level: 90, experience: '2+ Years', tag: 'Core Logic' },
      { name: 'React & TypeScript', level: 88, experience: '2+ Years', tag: 'SPA Framework' },
      { name: 'Responsive Web Design', level: 96, experience: '3+ Years', tag: 'Mobile-First' },
      { name: 'Git & GitHub Version Control', level: 85, experience: '2+ Years', tag: 'Collaboration' },
    ]
  },
  {
    category: 'UI/UX & Graphic Design',
    description: 'Creative design, vector artwork, brand identities, and high-fidelity interface prototypes.',
    skills: [
      { name: 'UI/UX Design & Prototyping', level: 92, experience: '2+ Years', tag: 'Figma' },
      { name: 'Graphic Design', level: 96, experience: '3+ Years', tag: 'Core Strength' },
      { name: 'Logo & Brand Identity', level: 90, experience: '3+ Years', tag: 'Creative' },
      { name: 'Poster & Banner Design', level: 95, experience: '3+ Years', tag: 'Visual Impact' },
      { name: 'Social Media Graphics', level: 94, experience: '3+ Years', tag: 'Marketing' },
      { name: 'Adobe Photoshop & Illustrator', level: 92, experience: '3+ Years', tag: 'Industry Standard' },
    ]
  },
  {
    category: 'CNC & Computerized Engineering',
    description: 'Industrial CAD/CAM drafting, 2D/3D relief modeling, and precision CNC machine operation.',
    skills: [
      { name: 'CNC Machine Design & Routing', level: 92, experience: '3+ Years', tag: 'Industrial' },
      { name: 'Computerized Design & Vectoring', level: 95, experience: '3+ Years', tag: 'Specialist' },
      { name: 'Vectric Aspire / ArtCAM', level: 90, experience: '3+ Years', tag: 'CAD/CAM' },
      { name: '2D/3D Relief Carving Modeling', level: 88, experience: '3+ Years', tag: '3D Mesh' },
      { name: 'Toolpath & G-Code Generation', level: 92, experience: '3+ Years', tag: 'Precision' },
      { name: 'Material Tolerance Optimization', level: 90, experience: '3+ Years', tag: 'Engineering' },
    ]
  },
  {
    category: 'Productivity & Digital Operations',
    description: 'Office automation, spreadsheet data processing, web research, and client communications.',
    skills: [
      { name: 'Microsoft Office & Excel', level: 96, experience: '4+ Years', tag: 'Data & Formulas' },
      { name: 'Digital Data Entry & Pipelines', level: 98, experience: '4+ Years', tag: 'Accuracy' },
      { name: 'In-Depth Web Research', level: 94, experience: '3+ Years', tag: 'Analytics' },
      { name: 'Professional Bilingual Communication', level: 90, experience: '3+ Years', tag: 'Bilingual' },
    ]
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'High-Performance Modern Web Apps',
    description: 'Custom frontend web application development using React, TypeScript, and Tailwind CSS. Built for extreme speed, SEO optimization, and flawless user interactions.',
    icon: 'Code2',
    popular: true,
    deliverables: [
      'Custom React & TypeScript SPA Architecture',
      'Lightning-fast load speed & clean code standards',
      'API Integration & Dynamic State Management',
      'Production deployment and domain setup'
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Futuristic, High-Converting Interfaces',
    description: 'Transforming abstract concepts into stunning, intuitive user interfaces with dark mode aesthetics, mathematical typographic scale, and seamless interactive user flows.',
    icon: 'Layout',
    popular: true,
    deliverables: [
      'High-fidelity interactive Figma prototypes',
      'Design systems, typography & color palettes',
      'Dark mode, glassmorphism & futuristic UI',
      'User journey mapping & usability audits'
    ]
  },
  {
    id: 'responsive-design',
    title: 'Responsive Website Design',
    subtitle: 'Pixel-Perfect on Every Screen',
    description: 'Fluid, mobile-first websites designed to look extraordinary across smartphones, tablets, laptops, and ultra-wide desktop monitors with zero visual breaking.',
    icon: 'Smartphone',
    deliverables: [
      'Mobile-first responsive layout architecture',
      'Touch-friendly navigation & mobile drawer menus',
      'Cross-browser and multi-device testing',
      'Optimized lightweight asset delivery'
    ]
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    subtitle: 'Silky Animations & Interactive Logic',
    description: 'Specialized frontend engineering with Framer Motion animations, complex forms, data visualizations, sound effects, and immersive micro-interactions.',
    icon: 'Sparkles',
    deliverables: [
      'Smooth scroll transitions & entrance animations',
      'Interactive dashboards & data visualizations',
      'Accessible, WCAG-compliant UI components',
      'Modular, maintainable React codebase'
    ]
  },
  {
    id: 'cnc-design',
    title: 'Precision CNC & CAD/CAM',
    subtitle: 'Industrial 2D/3D Relief Modeling',
    description: 'Millimeter-precise CAD vector files, 3D architectural relief carvings, parametric wall panels, and optimized G-code toolpaths ready for industrial CNC routers.',
    icon: 'Layers',
    deliverables: [
      '2D/3D CAD vector relief carvings',
      'Parametric jali & architectural wall screens',
      'Optimized CNC toolpaths & feed rate setups',
      'Material waste minimization algorithms'
    ]
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity & Graphics',
    subtitle: 'Memorable Vector Branding',
    description: 'Comprehensive visual branding packages including geometric vector logos, business typography, outdoor billboard banners, and cohesive social media grid kits.',
    icon: 'Palette',
    deliverables: [
      'Vector logo design & emblem variations',
      'Social media graphics & marketing banner kits',
      'High-res outdoor billboard & poster designs',
      'Full brand guidelines and typography rules'
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Futuristic Dark-Mode Portfolio Platform',
    category: 'Web Development',
    description: 'An ultra-premium cinematic personal portfolio platform engineered in React 18, TypeScript, Tailwind CSS, and Framer Motion with custom procedural Web Audio synthesis.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    link: '#home',
    demoUrl: '#home',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'],
    tags: ['Web App', 'SPA', 'Futuristic UI', 'Frontend'],
    featured: true,
    completionYear: '2025'
  },
  {
    id: 'proj-2',
    title: 'CNC Architectural Door Relief & Pattern Carving',
    category: 'CNC Design',
    description: 'High-precision 3D relief wood carving file engineered for industrial CNC routing with seamless geometric vector symmetry and automated toolpathing.',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    demoUrl: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Vectric Aspire', 'ArtCAM', 'AutoCAD', 'G-Code'],
    tags: ['CNC Router', '3D Relief', 'CAD Vector', 'Wood Art'],
    featured: true,
    completionYear: '2025'
  },
  {
    id: 'proj-3',
    title: 'Cyberpunk Brand Identity & Vector Logo System',
    category: 'Logo Design',
    description: 'Ultra-modern minimalist emblem designed with golden ratio vector geometry, electric neon rim glow, and complete dark-mode brand style guide.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.instagram.com/hay_nayeem/',
    demoUrl: 'https://www.instagram.com/hay_nayeem/',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Vector Math', 'Figma'],
    tags: ['Logo Design', 'Vector Art', 'Branding', 'Typography'],
    featured: true,
    completionYear: '2025'
  },
  {
    id: 'proj-4',
    title: 'Intricate Islamic Geometric CNC Wall Panel',
    category: 'CNC Design',
    description: 'Continuous laser and CNC cut parametric lattice panel modeled for high-end luxury interior architecture decoration and residential acoustics.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    demoUrl: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['ArtCAM 2018', 'Aspire 3D', 'Vector DXF', 'CNC Router'],
    tags: ['CNC Jali', 'Parametric', 'Laser Cut', 'Interior Art'],
    featured: true,
    completionYear: '2025'
  },
  {
    id: 'proj-5',
    title: 'Next-Gen Analytics Dashboard UI/UX Design',
    category: 'UI/UX Design',
    description: 'High-density glassmorphic dashboard interface for monitoring real-time metrics, CNC spindle diagnostics, and automated project pipelines.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.linkedin.com/in/muhammad-nayeem-327937409',
    demoUrl: 'https://www.linkedin.com/in/muhammad-nayeem-327937409',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Figma', 'Design System', 'Glassmorphism', 'UI/UX'],
    tags: ['UI/UX', 'Dashboard', 'Figma', 'Dark Mode'],
    featured: false,
    completionYear: '2024'
  },
  {
    id: 'proj-6',
    title: 'International Tech Expo Event Keynote Poster',
    category: 'Graphic Design',
    description: 'Dynamic typography and glassmorphism layered poster design created for next-gen technology and computerized design showcases.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    demoUrl: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Adobe Photoshop', 'Illustrator', 'Typography', 'Print CMYK'],
    tags: ['Poster Design', 'Event Graphics', 'Cyber Theme'],
    featured: true,
    completionYear: '2024'
  },
  {
    id: 'proj-7',
    title: 'Viral Social Media Campaign & Brand Grid Kit',
    category: 'Social Media Design',
    description: 'Comprehensive 12-post cohesive social media template system optimized for maximum conversion and high-retention engagement.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.instagram.com/hay_nayeem/',
    demoUrl: 'https://www.instagram.com/hay_nayeem/',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Photoshop', 'Canva Pro', 'Color Grading', 'Typography'],
    tags: ['Social Media', 'Carousel', 'Instagram UI', 'Marketing'],
    featured: false,
    completionYear: '2025'
  },
  {
    id: 'proj-8',
    title: 'Ultra-Premium Corporate Billboard & Outdoor Banner',
    category: 'Graphic Design',
    description: 'High-resolution large-format billboard banner engineered for optical clarity at scale with dark luxury styling and crisp vector contrast.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
    link: 'https://www.linkedin.com/in/muhammad-nayeem-327937409',
    demoUrl: 'https://www.linkedin.com/in/muhammad-nayeem-327937409',
    githubUrl: 'https://github.com/muhammad-nayeem',
    technologies: ['Adobe Illustrator', 'Large Format Vector', 'CMYK Print'],
    tags: ['Banner Design', 'Print Media', 'Luxury Branding'],
    featured: false,
    completionYear: '2024'
  }
];

export const statisticsData: StatItem[] = [
  { label: 'Design Works Completed', value: 10000, suffix: '+', description: '10,000+ Precision 2D/3D CNC & CAD Designs', icon: 'FolderGit2' },
  { label: 'Years Experience', value: 3, suffix: '+', description: 'Continuous practical industry expertise', icon: 'Award' },
  { label: 'Satisfied Clients', value: 85, suffix: '+', description: 'Across local and digital client projects', icon: 'Smile' },
  { label: 'Certificates & Milestones', value: 15, suffix: '+', description: 'Academic & technical recognitions', icon: 'FileCheck2' },
  { label: 'Social Followers', value: 12, suffix: 'K+', description: '12K+ verified digital community', icon: 'Users' },
];

export const socialMediaLinks: SocialMediaItem[] = [
  {
    name: 'Facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/muhammadnayeemuddin?mibextid=rS40aB7S9Ucbxw6v',
    handle: '@muhammadnayeemuddin',
    color: '#1877F2'
  },
  {
    name: 'Instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/hay_nayeem/',
    handle: '@hay_nayeem',
    color: '#E4405F'
  },
  {
    name: 'TikTok',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@muhammad__nayeem',
    handle: '@muhammad__nayeem',
    color: '#00F2FE'
  },
  {
    name: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/muhammad-nayeem-327937409',
    handle: 'in/muhammad-nayeem-327937409',
    color: '#0A66C2'
  },
  {
    name: 'Telegram',
    platform: 'telegram',
    url: 'https://t.me/developer_x_nayeem_ceo',
    handle: '@developer_x_nayeem_ceo',
    color: '#26A5E4'
  },
  {
    name: 'WhatsApp',
    platform: 'whatsapp',
    url: 'https://wa.me/16137070221',
    handle: '+1 (613) 707-0221',
    color: '#25D366'
  },
  {
    name: 'X (Twitter)',
    platform: 'x',
    url: 'https://x.com/NayeemUddi68418',
    handle: '@NayeemUddi68418',
    color: '#FFFFFF'
  },
  {
    name: 'Threads',
    platform: 'threads',
    url: 'https://share.google/XaxcTDLYOp07dyAbI',
    handle: '@hay_nayeem (Threads)',
    color: '#E1E1E1'
  },
  {
    name: 'YouTube',
    platform: 'youtube',
    url: 'https://www.youtube.com/@MuhammadNayeem',
    handle: '@MuhammadNayeem (Official)',
    color: '#FF0000'
  },
  {
    name: 'GitHub',
    platform: 'github',
    url: 'https://github.com/muhammad-nayeem',
    handle: 'github.com/muhammad-nayeem',
    color: '#E6EDF3'
  }
];

export const contactInfo: ContactInfo = {
  phone: '+8809638271552',
  whatsapp: '+16137070221',
  email: 'nayeemh5629@gmail.com',
  location: 'Hajiganj, Chandpur, Bangladesh',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58548.86801931326!2d90.81297126131456!3d23.24949574488876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754f2a7db76aa4d%3A0x6b5a38a7c2fe181c!2sHajiganj!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd',
  coordinates: {
    lat: 23.2495,
    lng: 90.8523
  }
};
