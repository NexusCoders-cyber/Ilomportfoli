import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { BotForm } from "./bot-form";
import type { BotInfo } from "@shared/schema";

export function BotManager() {
  const { data: bot, isLoading } = useQuery<BotInfo>({
    queryKey: ["/api/bot"],
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Amazing Bot Information</h2>
      <Card className="p-6">
        <BotForm bot={bot} />
      </Card>
    </div>
  );
}
