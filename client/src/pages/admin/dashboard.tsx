import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { LogOut, LayoutDashboard, FileText, Bot, Mail, FolderOpen } from "lucide-react";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { UpdatesManager } from "@/components/admin/updates-manager";
import { BotManager } from "@/components/admin/bot-manager";
import { MessagesManager } from "@/components/admin/messages-manager";
import type { Project, Update, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: updates = [] } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  const { data: messages = [] } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
  });

  const stats = [
    {
      icon: FolderOpen,
      label: "Projects",
      value: projects.length,
      color: "text-chart-1",
    },
    {
      icon: FileText,
      label: "Blog Posts",
      value: updates.length,
      color: "text-chart-2",
    },
    {
      icon: Mail,
      label: "Messages",
      value: messages.filter((m) => m.status === "new").length,
      color: "text-chart-3",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} data-testid="button-admin-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              <FileText className="h-4 w-4 mr-2" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="bot" data-testid="tab-bot">
              <Bot className="h-4 w-4 mr-2" />
              Bot Info
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages">
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                          </div>
                          <Icon className={`h-10 w-10 ${stat.color}`} />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setActiveTab("projects")}
                    data-testid="button-manage-projects"
                  >
                    <FolderOpen className="h-6 w-6" />
                    <span>Manage Projects</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setActiveTab("blog")}
                    data-testid="button-manage-blog"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Write Blog Post</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setActiveTab("bot")}
                    data-testid="button-manage-bot"
                  >
                    <Bot className="h-6 w-6" />
                    <span>Update Bot Info</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setActiveTab("messages")}
                    data-testid="button-view-messages"
                  >
                    <Mail className="h-6 w-6" />
                    <span>View Messages</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="blog">
            <UpdatesManager />
          </TabsContent>

          <TabsContent value="bot">
            <BotManager />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
