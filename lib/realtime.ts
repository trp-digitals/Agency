import { EventEmitter } from "events";

const globalForRealtime = globalThis as unknown as {
  realtimeEmitter: EventEmitter | undefined;
};

export const realtimeEmitter = globalForRealtime.realtimeEmitter ?? new EventEmitter();

// Avoid creating multiple emitters during hot-reloading in dev
if (process.env.NODE_ENV !== "production") {
  globalForRealtime.realtimeEmitter = realtimeEmitter;
}
