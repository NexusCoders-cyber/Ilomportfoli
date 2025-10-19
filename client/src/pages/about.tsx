import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Code2, 
  Database, 
  Palette, 
  GitBranch, 
  Server, 
  Smartphone,
  Calendar,
  Briefcase,
  GraduationCap
} from "lucide-react";

export default function About() {
  const skills = [
    { icon: Code2, name: "Frontend", description: "React, TypeScript, Tailwind CSS" },
    { icon: Server, name: "Backend", description: "Node.js, Express, REST APIs" },
    { icon: Database, name: "Database", description: "MongoDB, PostgreSQL, Redis" },
    { icon: GitBranch, name: "DevOps", description: "Git, Docker, CI/CD" },
    { icon: Smartphone, name: "Mobile", description: "React Native, PWA" },
    { icon: Palette, name: "Design", description: "Figma, UI/UX, Accessibility" },
  ];

  const timeline = [
    {
      type: "work",
      icon: Briefcase,
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      organization: "Tech Company",
      description: "Leading development of scalable web applications and mentoring junior developers.",
    },
    {
      type: "work",
      icon: Briefcase,
      year: "2021 - 2023",
      title: "Full Stack Developer",
      organization: "Startup Inc",
      description: "Built and maintained multiple client projects using modern web technologies.",
    },
    {
      type: "education",
      icon: GraduationCap,
      year: "2017 - 2021",
      title: "Bachelor of Computer Science",
      organization: "University Name",
      description: "Graduated with honors, specializing in software engineering and AI.",
    },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating elegant solutions to complex problems. 
            With years of experience in full-stack development, I specialize in building 
            scalable web applications and intelligent automation tools.
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Card className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">My Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I discovered my passion for programming during my university years, 
                    where I spent countless hours building projects and learning new technologies. 
                    What started as a hobby quickly turned into a career.
                  </p>
                  <p>
                    Today, I focus on creating tools that make people's lives easier. 
                    From web applications to intelligent bots, I believe technology should be 
                    accessible, beautiful, and genuinely helpful.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, 
                    contributing to open-source projects, or sharing knowledge with the developer community.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">What I Do</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I specialize in building full-stack web applications using modern technologies 
                    like React, Node.js, and TypeScript. My focus is on creating scalable, 
                    maintainable code that delivers exceptional user experiences.
                  </p>
                  <p>
                    I'm particularly passionate about bot development and automation. 
                    My flagship project, Amazing Bot, showcases my ability to create intelligent 
                    systems that solve real-world problems.
                  </p>
                  <p>
                    I also mentor junior developers and contribute to the tech community through 
                    blog posts, open-source projects, and speaking at local meetups.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover-elevate transition-all duration-300">
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
                    <p className="text-muted-foreground text-sm">{skill.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Experience & Education</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {/* Timeline Items */}
              <div className="space-y-8">
                {timeline.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex gap-6"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      {/* Content */}
                      <Card className="flex-1 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground font-medium">
                            {item.year}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                        <p className="text-primary font-medium mb-3">{item.organization}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
