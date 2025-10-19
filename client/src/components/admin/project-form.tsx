import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertProjectSchema, type InsertProject, type Project } from "@shared/schema";
import { useState } from "react";
import { X } from "lucide-react";

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const { toast } = useToast();
  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      stack: project?.stack || [],
      images: project?.images || [],
      githubUrl: project?.githubUrl || "",
      liveUrl: project?.liveUrl || "",
      featured: project?.featured || false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      if (project?._id) {
        return apiRequest("PUT", `/api/projects/${project._id}`, data);
      }
      return apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: project ? "Project updated" : "Project created",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    },
  });

  const addTech = () => {
    if (techInput.trim()) {
      const currentStack = form.getValues("stack");
      form.setValue("stack", [...currentStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (index: number) => {
    const currentStack = form.getValues("stack");
    form.setValue("stack", currentStack.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (imageInput.trim()) {
      const currentImages = form.getValues("images");
      form.setValue("images", [...currentImages, imageInput.trim()]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    form.setValue("images", currentImages.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My Awesome Project" {...field} data-testid="input-project-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of your project..."
                  rows={4}
                  {...field}
                  data-testid="input-project-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="React, Node.js, etc."
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                  data-testid="input-project-tech"
                />
                <Button type="button" onClick={addTech} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    <span className="text-sm">{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images (URLs)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addImage();
                    }
                  }}
                  data-testid="input-project-image"
                />
                <Button type="button" onClick={addImage} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {field.value.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="text-sm flex-1 truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} data-testid="input-project-github" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liveUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} data-testid="input-project-live" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="input-project-featured"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Project</FormLabel>
                <FormDescription>
                  Featured projects appear on the home page
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={mutation.isPending} data-testid="button-save-project">
            {mutation.isPending ? "Saving..." : project ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
