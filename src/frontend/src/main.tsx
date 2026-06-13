import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// ── Chunk-load error safety net ──────────────────────────────────────────────
// Catches dynamic-import failures that escape the React error boundary (e.g.
// errors thrown during module evaluation before React renders).  Uses the same
// sessionStorage guard as ErrorBoundary to prevent infinite reload loops.

const CHUNK_RELOAD_KEY = "tb_chunk_reload_attempted";

function isChunkError(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes("failed to fetch dynamically imported module") ||
    m.includes("loading chunk") ||
    m.includes("loading css chunk") ||
    m.includes("dynamically imported module")
  );
}

function safeReloadOnce(): void {
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) return; // already tried once
  sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  window.location.reload();
}

// Synchronous errors (e.g. script evaluation failures)
window.addEventListener("error", (event) => {
  const msg = event.message ?? "";
  if (isChunkError(msg)) {
    event.preventDefault();
    safeReloadOnce();
  }
});

// Async / Promise rejections (dynamic import() rejects with a TypeError)
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const msg =
    reason instanceof Error
      ? reason.message
      : typeof reason === "string"
        ? reason
        : "";
  if (isChunkError(msg)) {
    event.preventDefault();
    safeReloadOnce();
  }
});
// ─────────────────────────────────────────────────────────────────────────────

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
