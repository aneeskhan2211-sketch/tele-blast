import { Navigate } from "@tanstack/react-router";

/**
 * LoginPage — /login
 *
 * This route is now a STUB that immediately redirects to the landing page.
 * All auth logic (calling login(), post-auth routing) has been moved into
 * LandingPage.tsx where the "Create Account" and "Log In" buttons live.
 *
 * This stub exists only to avoid a 404 for any cached links pointing to /login.
 * The user never sees this page — they are redirected to / instantly.
 */
export default function LoginPage() {
  return <Navigate to="/" replace />;
}
