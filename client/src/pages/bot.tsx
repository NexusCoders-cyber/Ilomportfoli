import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, CheckCircle2, Sparkles } from "lucide-react";
import type { BotInfo } from "@shared/schema";

export default function Bot() {
  const { data: bot, isLoading } = useQuery<BotInfo>({
    queryKey: ["/api/bot"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
            <div className="aspect-video bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">Bot information not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">My Flagship Project</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                {bot.name}
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
              {bot.tagline}
            </p>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              {bot.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {bot.demoUrl && (
                <a href={bot.demoUrl} target="_blank" rel="noopener noreferrer" data-testid="button-try-demo">
                  <Button size="lg" className="group">
                    Try Live Demo
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              )}
              <a href={bot.githubRepo} target="_blank" rel="noopener noreferrer" data-testid="button-view-code">
                <Button size="lg" variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View Source Code
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Demo Section */}
          {bot.screenshots.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="overflow-hidden">
                <div className="aspect-video">
                  <img
                    src={bot.screenshots[0]}
                    alt={`${bot.name} demo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground text-lg">
              What makes {bot.name} special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bot.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-elevate transition-all duration-300">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                  <p className="text-lg leading-relaxed">{feature}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {bot.screenshots.length > 1 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
              <p className="text-muted-foreground text-lg">
                See {bot.name} in action
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bot.screenshots.slice(1).map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-elevate transition-all duration-300">
                    <img
                      src={screenshot}
                      alt={`${bot.name} screenshot ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Check out the source code on GitHub and start using {bot.name} today
            </p>
            <a href={bot.githubRepo} target="_blank" rel="noopener noreferrer" data-testid="button-get-started">
              <Button size="lg">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
