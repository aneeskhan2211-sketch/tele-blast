import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  isChunkError: boolean;
  reloadFailed: boolean;
}

const CHUNK_RELOAD_KEY = "tb_chunk_reload_attempted";

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("failed to fetch dynamically imported module") ||
    msg.includes("loading chunk") ||
    msg.includes("loading css chunk") ||
    msg.includes("dynamically imported module") ||
    error.name === "ChunkLoadError" ||
    (error.name === "TypeError" && msg.includes("fetch"))
  );
}

/** Reload once to pick up fresh index.html after a deploy.
 *  Uses sessionStorage to prevent an infinite reload loop. */
function reloadOnce(): boolean {
  const already = sessionStorage.getItem(CHUNK_RELOAD_KEY);
  if (already) {
    // Already tried — don't loop; show manual fallback instead.
    return false;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
  window.location.reload();
  return true;
}

function ChunkErrorFallback({ loopDetected }: { loopDetected: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4 p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-label="Error"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-foreground">
          {loopDetected ? "The app was updated." : "Loading failed"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {loopDetected
            ? "A new version of Tele-Blast is available. Please reload to continue."
            : "A page failed to load. Tap below to get the latest version."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          sessionStorage.removeItem(CHUNK_RELOAD_KEY);
          window.location.reload();
        }}
        className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        data-ocid="error_boundary.reload_button"
      >
        Reload app
      </button>
    </div>
  );
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // If we're mounting after a reload attempt, clear the flag so
    // subsequent errors can try once more.
    const reloadFailed = sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";
    if (reloadFailed) {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    }

    this.state = { hasError: false, isChunkError: false, reloadFailed };
  }

  static getDerivedStateFromError(error: unknown): Partial<State> {
    return {
      hasError: true,
      isChunkError: isChunkLoadError(error),
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    if (isChunkLoadError(error)) {
      // Attempt a one-shot reload to fetch fresh assets.
      // reloadOnce() returns false if we already tried — show the fallback UI.
      if (!reloadOnce()) {
        this.setState({ reloadFailed: true });
      }
      return;
    }
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.state.isChunkError) {
        return <ChunkErrorFallback loopDetected={this.state.reloadFailed} />;
      }
      return this.props.fallback ?? <ChunkErrorFallback loopDetected={false} />;
    }
    return this.props.children;
  }
}
