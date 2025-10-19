import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertBotInfoSchema, type InsertBotInfo, type BotInfo } from "@shared/schema";
import { useState } from "react";
import { X } from "lucide-react";

interface BotFormProps {
  bot?: BotInfo;
}

export function BotForm({ bot }: BotFormProps) {
  const { toast } = useToast();
  const [featureInput, setFeatureInput] = useState("");
  const [screenshotInput, setScreenshotInput] = useState("");

  const form = useForm<InsertBotInfo>({
    resolver: zodResolver(insertBotInfoSchema),
    defaultValues: {
      name: bot?.name || "",
      tagline: bot?.tagline || "",
      description: bot?.description || "",
      demoUrl: bot?.demoUrl || "",
      githubRepo: bot?.githubRepo || "",
      screenshots: bot?.screenshots || [],
      features: bot?.features || [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertBotInfo) => {
      return apiRequest("PUT", "/api/bot", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bot"] });
      toast({
        title: "Success",
        description: "Bot information updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update bot information",
        variant: "destructive",
      });
    },
  });

  const addFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features");
      form.setValue("features", [...currentFeatures, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", currentFeatures.filter((_, i) => i !== index));
  };

  const addScreenshot = () => {
    if (screenshotInput.trim()) {
      const currentScreenshots = form.getValues("screenshots");
      form.setValue("screenshots", [...currentScreenshots, screenshotInput.trim()]);
      setScreenshotInput("");
    }
  };

  const removeScreenshot = (index: number) => {
    const currentScreenshots = form.getValues("screenshots");
    form.setValue("screenshots", currentScreenshots.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Name</FormLabel>
              <FormControl>
                <Input placeholder="Amazing Bot" {...field} data-testid="input-bot-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="A smart assistant that..." {...field} data-testid="input-bot-tagline" />
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
                  placeholder="Detailed description of your bot..."
                  rows={4}
                  {...field}
                  data-testid="input-bot-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="githubRepo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repository</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} data-testid="input-bot-github" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} data-testid="input-bot-demo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a feature..."
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                  data-testid="input-bot-feature"
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {field.value.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded">
                    <span className="flex-1">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
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

        <FormField
          control={form.control}
          name="screenshots"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Screenshots (URLs)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/screenshot.jpg"
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addScreenshot();
                    }
                  }}
                  data-testid="input-bot-screenshot"
                />
                <Button type="button" onClick={addScreenshot} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-2 mt-2">
                {field.value.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <img
                      src={url}
                      alt={`Screenshot ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="text-sm flex-1 truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScreenshot(index)}
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

        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={mutation.isPending} data-testid="button-save-bot">
            {mutation.isPending ? "Saving..." : "Update Bot Info"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
