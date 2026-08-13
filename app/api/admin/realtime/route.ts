import { NextRequest } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { realtimeEmitter } from "@/lib/realtime";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Check authorization
  if (!(await isAuthenticatedAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const responseStream = new ReadableStream({
    start(controller) {
      // Send initial connection confirmation
      controller.enqueue("data: {\"type\":\"CONNECTED\"}\n\n");

      const listener = (event: any) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(event)}\n\n`);
        } catch (err) {
          console.error("Error writing to SSE stream:", err);
        }
      };

      // Subscribe to internal events
      realtimeEmitter.on("update", listener);

      // Heartbeat interval to keep connection active
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue("data: {\"type\":\"HEARTBEAT\"}\n\n");
        } catch (err) {
          console.error("Error writing heartbeat to SSE stream:", err);
        }
      }, 15000);

      // Cleanup listener and interval on client abort
      req.signal.addEventListener("abort", () => {
        realtimeEmitter.off("update", listener);
        clearInterval(heartbeatInterval);
        controller.close();
      });
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
