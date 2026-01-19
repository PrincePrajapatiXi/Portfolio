// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                        🚀 PORTFOLIO DATA FILE                              ║
// ║         Edit this file to customize your portfolio content                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝


// ═══════════════════════════════════════════════════════════════════════════
// 👤 PERSONAL INFORMATION - Apni details yahan update karo
// ═══════════════════════════════════════════════════════════════════════════
export const personalInfo = {
    name: 'Prince Prajapati',           // Tumhara naam
    title: 'Full Stack Developer',       // Tumhari job title
    tagline: 'Building digital experiences that matter',  // Hero section tagline
    email: 'your.email@example.com',     // ← APNA EMAIL DAALO
    location: 'India',
    resumeUrl: '#',                       // ← RESUME PDF LINK DAALO
    socials: {
        github: 'https://github.com/yourusername',       // ← GITHUB LINK
        linkedin: 'https://linkedin.com/in/yourprofile', // ← LINKEDIN LINK
        twitter: 'https://twitter.com/yourhandle',       // ← TWITTER/X LINK
    },
    about: `Yahan apne baare mein likho - 2-3 paragraphs.
    
Example: I'm a passionate Full Stack Developer with experience in building web applications using React, Node.js, and MongoDB.`,
    stats: {
        experience: '3+',    // Years of experience
        projects: '10+',     // Number of projects
        clients: '5+',       // Number of clients
    }
};


// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PROJECTS - YAHAN APNE PROJECTS ADD KARO
// ═══════════════════════════════════════════════════════════════════════════
// 
// ⭐ FEATURED PROJECTS - Ye 4 projects main page pe dikhenge (Bento Grid)
// 
// Har project mein ye cheezein daalni hain:
//   - id: Unique number (1, 2, 3, ...)
//   - title: Project ka naam
//   - description: 1-2 lines mein project ka description
//   - tags: Technologies use ki hain (array format)
//   - liveUrl: Live demo ka link
//   - githubUrl: GitHub repo ka link
//   - size: 'large' (big card) / 'medium' (normal) / 'small' (compact)
//
// ═══════════════════════════════════════════════════════════════════════════

export const featuredProjects = [
    // ┌─────────────────────────────────────────────────────────────────────┐
    // │ PROJECT 1 - Ye sabse bada card hoga (size: 'large')                │
    // └─────────────────────────────────────────────────────────────────────┘
    {
        id: 1,
        title: 'Catch Store',
        description: 'A modern e-commerce store with secure payments, admin panel, and order tracking.',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        liveUrl: 'https://catchystore.vercel.app/',
        githubUrl: 'https://github.com/PrincePrajapatiXi/E-commerce',
        size: 'large',
    },

    // ┌─────────────────────────────────────────────────────────────────────┐
    // │ PROJECT 2 - Medium size card                                        │
    // └─────────────────────────────────────────────────────────────────────┘
    {
        id: 2,
        title: 'Tic Tac Toe',
        description: 'A classic Tic Tac Toe game with sound effects, AI opponent, and responsive design.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveUrl: 'https://princeprajapatixi.github.io/Tic-Tac-Toe/',
        githubUrl: 'https://github.com/PrincePrajapatiXi/Tic-Tac-Toe',
        size: 'medium',
    },

    // ┌─────────────────────────────────────────────────────────────────────┐
    // │ PROJECT 3 - Medium size card                                        │
    // └─────────────────────────────────────────────────────────────────────┘
    {
        id: 3,
        title: 'Army SMP-2',
        description: 'A full-stack Minecraft server store with ranks, cosmetics, payment integration, and admin panel.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Vite', 'Minecraft', 'E-commerce'],
        liveUrl: 'https://armysmp2.vercel.app/',
        githubUrl: 'https://github.com/PrincePrajapatiXi/Army-SMP-2',
        size: 'large',
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// 📂 ALL PROJECTS - Featured + Extra projects
// "View All" button pe ye dikhenge
// ═══════════════════════════════════════════════════════════════════════════
export const allProjects = [
    ...featuredProjects,  // ← Featured projects automatically include honge

    // Extra projects yahan add karo (agar 4 se zyada hain):
    // {
    //     id: 5,
    //     title: 'Project 5 Ka Naam',
    //     description: 'Description',
    //     tags: ['Tech1', 'Tech2'],
    //     liveUrl: 'https://link.com',
    //     githubUrl: 'https://github.com/link',
    // },
];


// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ SKILLS - Apni skills yahan edit karo
// ═══════════════════════════════════════════════════════════════════════════
export const skills = {
    frontend: [
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
    backend: [
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Java', icon: 'java' },
        { name: 'MySQL', icon: 'mysql' },
    ],
    languages: [
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Python', icon: 'python' },
        { name: 'Java', icon: 'java' },
    ],
    tools: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'VS Code', icon: 'vscode' },
        { name: 'Figma', icon: 'figma' },
        { name: 'Antigravity AI', icon: 'antigravity' },
    ],
};


// ═══════════════════════════════════════════════════════════════════════════
// 💼 EXPERIENCE - Apni job experience yahan add karo
// ═══════════════════════════════════════════════════════════════════════════
export const experiences = [
    {
        id: 1,
        role: 'Full Stack Developer',           // Job title
        company: 'Company Name',                // Company ka naam
        companyUrl: 'https://company.com',      // Company website
        duration: 'Jan 2024 - Present',         // Duration
        description: 'Kya kaam kiya - 1-2 lines mein likho.',
        skills: ['React', 'Node.js', 'MongoDB'],
    },
    // Aur jobs add karo same format mein...
];


// ═══════════════════════════════════════════════════════════════════════════
// 🎓 EDUCATION - Apni education yahan add karo
// ═══════════════════════════════════════════════════════════════════════════
export const education = [
    {
        id: 1,
        degree: 'Class 12th (Science)',      // ← Tumhari class aur stream
        school: 'SVM Inter College',
        duration: 'Currently Studying',       // ← Abhi padh rahe ho
    },
    // Aur education add karo agar chahiye...
];


// ═══════════════════════════════════════════════════════════════════════════
// �️ TIMELINE - Apni puri journey yahan add karo (Interactive Timeline ke liye)
// ═══════════════════════════════════════════════════════════════════════════
// Types: 'education' | 'work' | 'project' | 'milestone'
// Icons: 'education', 'work', 'project', 'milestone', 'code', 'rocket'
export const timeline = [
    {
        id: 1,
        type: 'education',
        title: 'Class 12th (Science)',
        subtitle: 'SVM Inter College',
        date: '2024 - Present',
        description: 'Currently studying in Class 12th with Science stream, preparing for higher education.',
        icon: 'education',
        expandedContent: 'Focusing on Physics, Chemistry, and Mathematics while continuing to develop programming skills.',
    },
    {
        id: 2,
        type: 'milestone',
        title: 'Started Learning Web Development',
        subtitle: 'Self-taught Journey',
        date: '2023',
        description: 'Began my journey into web development, learning HTML, CSS, and JavaScript.',
        icon: 'code',
        expandedContent: 'Started with basics and gradually moved to advanced concepts. Built small projects to practice.',
    },
    {
        id: 3,
        type: 'project',
        title: 'Catch Store - E-commerce',
        subtitle: 'Full Stack Project',
        date: '2024',
        description: 'Built a complete e-commerce store with React, Node.js, and MongoDB.',
        icon: 'rocket',
        expandedContent: 'Features include secure payments, admin panel, order tracking, and responsive design. My first major full-stack project.',
    },
    {
        id: 4,
        type: 'project',
        title: 'Army SMP-2 Store',
        subtitle: 'Minecraft Server Store',
        date: '2024',
        description: 'Full-stack Minecraft server store with ranks, cosmetics, and payment integration.',
        icon: 'rocket',
        expandedContent: 'Complete e-commerce solution for a Minecraft server including admin dashboard, payment gateway, and order management.',
    },
    {
        id: 5,
        type: 'milestone',
        title: 'Exploring AI Tools',
        subtitle: 'Antigravity AI & More',
        date: '2025',
        description: 'Started using AI-powered development tools to enhance productivity.',
        icon: 'milestone',
        expandedContent: 'Learning to leverage AI for faster development while maintaining code quality and understanding.',
    },
    // ← APNI JOURNEY YAHAN ADD KARO (same format mein)
];


// ═══════════════════════════════════════════════════════════════════════════
// �🔗 NAVIGATION LINKS - Yeh navbar mein dikhenge
// ═══════════════════════════════════════════════════════════════════════════
export const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#timeline' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];


// ═══════════════════════════════════════════════════════════════════════════
// 💬 TESTIMONIALS - Add reviews from clients/peers here
// ═══════════════════════════════════════════════════════════════════════════
// 
// HOW TO ADD A NEW TESTIMONIAL:
// 1. Copy the template below
// 2. Change 'id' to next number (2, 3, 4...)
// 3. Fill in the details
// 4. Uncomment by removing // from each line
//
export const testimonials = [
    {
        id: 1,                                          // Unique number (1, 2, 3...)
        name: 'RUDRANSH SINGH',                         // Person's name
        role: 'Server Owner',                           // Their position/role
        company: 'Army SMP-2',                          // Company or project name
        projectUrl: 'https://armysmp2.vercel.app/',     // Link to the project (optional)
        avatar: '',                                     // Photo URL (leave empty if none)
        text: 'Prince built an amazing store for our Minecraft server. The payment integration works perfectly and the admin panel is very user-friendly.',
    },

    // ══════════════════════════════════════════════════════════════════════
    // TEMPLATE - Copy this to add more testimonials:
    // ══════════════════════════════════════════════════════════════════════
    // {
    //     id: 2,                              // Change to next number
    //     name: 'Person Name',                // Their name
    //     role: 'Their Position',             // Like "Developer", "Client", "Team Lead"
    //     company: 'Company Name',            // Company or project name
    //     projectUrl: 'https://example.com',  // Link to project (optional)
    //     avatar: '',                         // Photo URL (optional)
    //     text: 'Write the testimonial here...',
    // },
];


// ═══════════════════════════════════════════════════════════════════════════
// 🏆 CERTIFICATIONS - Add your certificates & achievements here
// ═══════════════════════════════════════════════════════════════════════════
// 
// HOW TO ADD A NEW CERTIFICATE:
// 1. Copy the template below
// 2. Change 'id' to next number (3, 4, 5...)
// 3. Fill in your certificate details
// 4. Uncomment by removing // from each line
//
export const certifications = [
    {
        id: 1,                                       // Unique number (1, 2, 3...)
        title: 'Full Stack Web Development',         // Certificate name
        issuer: 'Self-Learned',                      // Who gave it? (Coursera, Udemy, etc.)
        date: '2024',                                // Year received
        credentialUrl: '',                           // Verification link (leave empty if none)
        icon: 'code',                                // Icon: 'code' | 'award' | 'certificate'
    },
    {
        id: 2,
        title: 'React.js Mastery',
        issuer: 'Self-Learned',
        date: '2024',
        credentialUrl: '',
        icon: 'code',
    },

    // ══════════════════════════════════════════════════════════════════════
    // TEMPLATE - Copy this to add more certificates:
    // ══════════════════════════════════════════════════════════════════════
    // {
    //     id: 3,                                   // Change to next number
    //     title: 'Certificate Name',               // Name of certificate
    //     issuer: 'Platform Name',                 // Who issued it
    //     date: '2024',                            // Year
    //     credentialUrl: 'https://verify.com',     // Verification link (optional)
    //     icon: 'award',                           // 'code' | 'award' | 'certificate'
    // },
];
