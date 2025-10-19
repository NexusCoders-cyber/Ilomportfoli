import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { SEOHead } from "@/components/seo-head";
import type { Project } from "@shared/schema";

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <SEOHead
        title="Portfolio - Developer & Bot Creator"
        description="Building helpful bots and beautiful web applications. Explore my projects, read my blog, and discover Amazing Bot."
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-chart-2/5" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-primary/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 50}px`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Available for new opportunities</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              Hi — I'm{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                Your Name
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              I build helpful bots and beautiful web apps
            </p>

            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Creator of <span className="text-primary font-semibold">Amazing Bot</span> — a smart assistant that makes your life easier. Explore my projects, read updates, or message me.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/bot">
                <a data-testid="button-see-bot">
                  <Button size="lg" className="group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      See My Bot
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-chart-2"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </Button>
                </a>
              </Link>

              <Link href="/projects">
                <a data-testid="button-view-projects">
                  <Button size="lg" variant="outline" className="backdrop-blur-sm">
                    View Projects
                  </Button>
                </a>
              </Link>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
          >
            <motion.div variants={itemVariants}>
              <Card className="p-6 hover-elevate transition-all duration-300">
                <Code className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Full Stack Development</h3>
                <p className="text-muted-foreground text-sm">
                  Building modern web applications with React, Node.js, and cutting-edge technologies
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 hover-elevate transition-all duration-300">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Bot Development</h3>
                <p className="text-muted-foreground text-sm">
                  Creating intelligent assistants and automation tools that solve real problems
                </p>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 hover-elevate transition-all duration-300">
                <Sparkles className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground text-sm">
                  Crafting beautiful, accessible interfaces that users love to interact with
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground text-lg">Check out some of my latest work</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <a data-testid={`card-project-${project.slug}`}>
                      <Card className="overflow-hidden hover-elevate transition-all duration-300 h-full">
                        {project.images[0] && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <a data-testid="button-all-projects">
                  <Button variant="outline" size="lg">
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'm always open to discussing new opportunities and collaborations.
            </p>
            <Link href="/contact">
              <a data-testid="button-get-in-touch">
                <Button size="lg">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
