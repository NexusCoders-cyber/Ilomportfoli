import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactMessage } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export function MessagesManager() {
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/contact"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "read" | "replied" }) => {
      return apiRequest("PATCH", `/api/contact/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Success",
        description: "Message status updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge>New</Badge>;
      case "read":
        return <Badge variant="outline">Read</Badge>;
      case "replied":
        return <Badge variant="secondary">Replied</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>

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
      ) : messages.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No messages yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message._id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{message.name}</h3>
                    {getStatusBadge(message.status)}
                  </div>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-sm text-primary hover:underline mb-2 block"
                  >
                    {message.email}
                  </a>
                  <p className="text-muted-foreground whitespace-pre-wrap mb-3">
                    {message.message}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {message.createdAt
                        ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
                        : "Recently"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {message.status === "new" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateStatusMutation.mutate({ id: message._id!, status: "read" })
                    }
                    data-testid={`button-mark-read-${message._id}`}
                  >
                    <MailOpen className="h-4 w-4 mr-1" />
                    Mark as Read
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateStatusMutation.mutate({ id: message._id!, status: "replied" })
                  }
                  disabled={message.status === "replied"}
                  data-testid={`button-mark-replied-${message._id}`}
                >
                  Mark as Replied
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
