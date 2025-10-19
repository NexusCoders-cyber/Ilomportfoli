import { useState } from "react";
import { useQuery, useMutation } from "@tantml:react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { UpdateForm } from "./update-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Update } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export function UpdatesManager() {
  const { toast } = useToast();
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [deletingUpdate, setDeletingUpdate] = useState<Update | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data: updates = [], isLoading } = useQuery<Update[]>({
    queryKey: ["/api/updates"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/updates/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/updates"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
      setDeletingUpdate(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-update">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Blog Post</DialogTitle>
            </DialogHeader>
            <UpdateForm onSuccess={() => setCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </Card>
          ))}
        </div>
      ) : updates.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No blog posts yet. Create your first one!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {updates.map((update) => (
            <Card key={update._id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{update.title}</h3>
                    {update.published ? (
                      <Badge>Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {update.contentMarkdown.substring(0, 150)}...
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {update.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {update.publishedAt && (
                    <p className="text-xs text-muted-foreground">
                      Published {formatDistanceToNow(new Date(update.publishedAt), { addSuffix: true })}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {update.published && (
                    <a href={`/blog/${update.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  <Dialog
                    open={editingUpdate?._id === update._id}
                    onOpenChange={(open) => !open && setEditingUpdate(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingUpdate(update)}
                        data-testid={`button-edit-update-${update.slug}`}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Blog Post</DialogTitle>
                      </DialogHeader>
                      <UpdateForm
                        update={update}
                        onSuccess={() => setEditingUpdate(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeletingUpdate(update)}
                    data-testid={`button-delete-update-${update.slug}`}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={!!deletingUpdate}
        onOpenChange={(open) => !open && setDeletingUpdate(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingUpdate?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingUpdate && deleteMutation.mutate(deletingUpdate._id!)}
              data-testid="button-confirm-delete-update"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
