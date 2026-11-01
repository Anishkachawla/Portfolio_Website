// Single place to edit all portfolio content.
// Everything below comes from your resume / LinkedIn export.

export const profile = {
  name: 'Anishka Chawla',
  firstName: 'Anishka',
  role: 'Software Engineer',
  location: 'Ludhiana, Punjab',
  headline:
    'Computer Engineering student building intelligent software, from agentic AI systems and semantic search to polished full-stack web apps.',
  short:
    'Passionate about building intelligent, reliable software that turns messy data and ideas into products people actually use.',
  email: 'chawlanishka82@gmail.com',
  collegeEmail: 'achawla1_be23@thapar.edu',
  github: 'https://github.com/Anishkachawla',
  linkedin: 'https://www.linkedin.com/in/anishka-chawla-79154a31a',
  resumeUrl: '/resume.pdf',
  availability: 'Open to SDE internships & full-time roles',
  photo: '/profile.jpg',
};

export const stats = [
  { value: '8.12', label: 'CGPA at Thapar' },
  { value: '2', label: 'Internships' },
];

export const techMarquee = [
  'Python', 'React.js', 'Node.js', 'FastAPI', 'Tailwind CSS', 'Next.js',
  'Google Cloud', 'BigQuery', 'Vertex AI', 'LangChain', 'CrewAI', 'Docker',
  'MongoDB', 'Power BI', 'MCP',
];

export const process = [
  {
    n: '01',
    title: 'Understand',
    text: 'Start from the problem and the data. What does the user need, and what does "good" look like in numbers?',
  },
  {
    n: '02',
    title: 'Architect',
    text: 'Pick simple, testable building blocks: clean APIs, solid data structures, the right model for the job.',
  },
  {
    n: '03',
    title: 'Deliver',
    text: 'Ship end to end, benchmark it, containerize it and iterate until it measurably works.',
  },
];

export const projects = [
  {
    title: 'Semantic ATS Resume Matching',
    tag: 'NLP · Full-stack',
    stack: ['Python', 'FastAPI', 'React.js', 'Tailwind CSS', 'Sentence Transformers', 'Gemini API'],
    bullets: [
      'Scores resume vs job description fit from 0–100 using keyword matching, semantic similarity and structural analysis.',
      'Explains the score with matched and missing skills, plus AI-generated feedback to improve the resume.',
    ],
    gradient: 'from-lime-300 via-lime-200 to-white',
    link: 'https://github.com/Anishkachawla/Semantic-ATS-Resume-Matching-System.git',
  },
  {
    title: 'Autonomous Multi-Agent Developer Suite',
    tag: 'Agentic AI',
    stack: ['CrewAI', 'Python', 'MCP', 'Docker', 'Gemini API', 'LLMs'],
    bullets: [
      'Role-based agent hierarchy (PM, Developer, QA) that turns requirements into working code with zero intervention.',
      'Runs generated code in an isolated Docker sandbox to compile, test and iteratively debug.',
    ],
    gradient: 'from-emerald-200 via-lime-200 to-white',
    link: 'https://github.com/Anishkachawla/Engineering_Team.git',
  },
  {
    title: 'LinkedIn Personal Brand Builder',
    tag: 'GenAI · Web app',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Python', 'Gemini API', 'Firebase Auth'],
    bullets: [
      'Scrapes and classifies 100+ industry news articles, then summarizes them with generative AI.',
      'Turns summaries into LinkedIn-ready post drafts in under 5 seconds per post.',
    ],
    gradient: 'from-lime-400 via-lime-200 to-lime-50',
    link: 'https://genlinked.vercel.app/',
  },
  {
    title: 'Hyperspectral Millet Nutrient Prediction',
    tag: 'Research · Deep Learning',
    stack: ['Deep Learning', 'Regression', 'Python'],
    bullets: [
      'Deep learning regression models predicting moisture, fats, carbohydrates and protein from hyperspectral data.',
      'Benchmarked a custom hybrid architecture against existing models using reduced wavelength feature sets.',
    ],
    gradient: 'from-yellow-200 via-lime-200 to-white',
    link: null, // research work at CSIR-CSIO, no public repo
  },
];

export const experience = [
  {
    role: 'Research Intern',
    org: 'CSIR – Central Scientific Instruments Organisation (CSIO)',
    place: 'Chandigarh',
    period: 'Jun 2026 – Jul 2026',
    points: [
      'Designed and built deep learning regression models for hyperspectral millet nutrient prediction, evaluating reduced wavelength feature sets.',
      'Benchmarked a custom hybrid architecture against existing models for reliable multi-output estimation of moisture, fats, carbohydrates and protein.',
    ],
  },
  {
    role: 'Intern',
    org: 'Colt Technology Services',
    place: 'Remote',
    period: 'Jun 2025 – Jul 2025',
    points: [
      'Built a Semantic Vector Search Engine with Streamlit, Google Cloud BigQuery and Vertex AI, searching across datasets of 10K+ records.',
      'Engineered a highlighting mechanism on BigQuery ML embeddings that improved search relevance by 30%.',
      'Integrated Power BI dashboards for analytics and reporting.',
    ],
  },
];

export const education = [
  {
    school: 'Thapar Institute of Engineering and Technology',
    detail: 'B.E. in Computer Engineering · CGPA 8.12',
    place: 'Patiala, Punjab',
    period: 'Expected 2027',
  },
  {
    school: 'West Point School',
    detail: 'CBSE XII · 89%',
    place: 'Kotakapura, Punjab',
    period: '2023',
  },
  {
    school: 'DAV Public School',
    detail: 'CBSE X · 94%',
    place: 'Ludhiana, Punjab',
    period: '2021',
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript'] },
  { group: 'GenAI & Agentic AI', items: ['LangChain', 'RAG', 'CrewAI', 'OpenAI Agents SDK', 'MCP'] },
  { group: 'Web Development', items: ['React.js', 'Node.js', 'Next.js', 'Tailwind CSS'] },
  { group: 'Cloud', items: ['Google Cloud Platform'] },
  { group: 'Tools', items: ['Power BI', 'MongoDB', 'VS Code', 'GitHub'] },
  {
    group: 'Core CS',
    items: ['Data Structures & Algorithms', 'OOPs', 'Operating Systems', 'SQL', 'Computer Networks'],
  },
];

export const certifications = ['AI Engineer Agentic Track: The Complete Agent and MCP Course'];

export const chatSuggestions = [
  'What projects have you built?',
  'Tell me about your internships',
  'What are your strongest skills?',
];
