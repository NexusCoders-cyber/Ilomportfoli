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
import { insertUpdateSchema, type InsertUpdate, type Update } from "@shared/schema";
import { useState } from "react";
import { X } from "lucide-react";

interface UpdateFormProps {
  update?: Update;
  onSuccess: () => void;
}

export function UpdateForm({ update, onSuccess }: UpdateFormProps) {
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");

  const form = useForm<InsertUpdate>({
    resolver: zodResolver(insertUpdateSchema),
    defaultValues: {
      title: update?.title || "",
      contentMarkdown: update?.contentMarkdown || "",
      tags: update?.tags || [],
      published: update?.published || false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertUpdate) => {
      if (update?._id) {
        return apiRequest("PUT", `/api/updates/${update._id}`, data);
      }
      return apiRequest("POST", "/api/updates", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/updates"] });
      toast({
        title: "Success",
        description: update ? "Blog post updated" : "Blog post created",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    },
  });

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter((_, i) => i !== index));
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
                <Input placeholder="My Blog Post Title" {...field} data-testid="input-update-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentMarkdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your blog post content in Markdown..."
                  rows={12}
                  {...field}
                  data-testid="input-update-content"
                />
              </FormControl>
              <FormDescription>
                You can use Markdown syntax for formatting
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="JavaScript, React, etc."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  data-testid="input-update-tag"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
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
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="input-update-published"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish this post</FormLabel>
                <FormDescription>
                  Published posts will be visible to everyone
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="submit" disabled={mutation.isPending} data-testid="button-save-update">
            {mutation.isPending ? "Saving..." : update ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
