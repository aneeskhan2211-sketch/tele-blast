/**
 * ZoomCallbackPage — handles the OAuth redirect from Zoom.
 *
 * Zoom redirects here with ?code=... after the user approves OAuth.
 * Because CORS blocks a direct token exchange from ICP-hosted frontend,
 * we store the code and mark the flow complete, then redirect to /dashboard.
 * The dashboard detects the `zoomOAuthComplete` flag and shows a banner.
 */
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function ZoomCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Zoom OAuth removed — redirect straight to dashboard
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}
