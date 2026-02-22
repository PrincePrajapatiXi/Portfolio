const experiences = [
  {
    period: "2026 — Present",
    role: "Full Stack Developer (Personal Projects)",
    company: "Independent Projects",
    description: "Developed a full-scale E-commerce platform featuring user authentication and payment integration. Focused on optimizing performance and responsive design.",
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    current: true,
  },
  {
    period: "2025 — 2026",
    role: "Open Source Contributor",
    company: "GitHub Community",
    description: "Contributed to various UI libraries by fixing bugs and improving documentation. Enhanced accessibility for the main navigation components.",
    technologies: ["HTML", "CSS", "GitHub"],
    current: false,
  },
  {
    period: "2024 — 2026",
    role: "Lead Student Developer",
    company: "S.V.M Inter College",
    description: "Developed a Task Management Dashboard for the Computer Science curriculum. Integrated drag-and-drop functionality and real-time updates to help students manage their homework efficiently.",
    technologies: ["JavaScript", "React", "CSS3"],
    current: false,
  },
  {
    period: "2024 — Present",
    role: "Self-Taught Web Developer",
    company: "Self-Directed Learning",
    description: "Mastered web development fundamentals by building 10+ hands-on projects, including weather applications and personal portfolios. Focused on responsive design and modern UI/UX principles.",
    technologies: ["HTML5", "Tailwind CSS", "JavaScript"],
    current: true,
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 md:mb-16">
          <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold
           mt-3 md:mt-4 mb-4 md:mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Experience that{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              speaks volumes.
            </span>
          </h2>

          <p
            className="text-sm md:text-base text-muted-foreground
           animate-fade-in animation-delay-200"
          >
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${idx % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:col-start-2 md:pl-16"
                    }`}
                >
                  <div
                    className={`glass p-4 md:p-6 rounded-xl md:rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-base md:text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{exp.company}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-3 md:mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "md:justify-end" : ""
                        }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};