import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";
import { TranscriptDrawer } from "@/components/transcript-drawer";


export function ChatControls() {
  return (
    <div className="absolute top-2 left-2 right-2 flex justify-between">
      <div className="flex gap-2">
        <TranscriptDrawer>
          <Button variant="outline" size="icon">
            <MessageSquareQuote className="h-4 w-4" />
          </Button>
        </TranscriptDrawer>
      </div>
    </div>
  );
}
