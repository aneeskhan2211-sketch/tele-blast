import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { InstallPrompt } from "./components/InstallPrompt";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// ── Critical account-flow pages — STATIC imports (no lazy, no chunk 404 risk) ──
import ActivateNewPage from "./pages/ActivateNewPage";
import ActivatePage from "./pages/ActivatePage";
import AgreementPage from "./pages/AgreementPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import PaymentPage from "./pages/PaymentPage";
import PreSignupPage from "./pages/PreSignupPage";
import ZoomCallbackPage from "./pages/ZoomCallbackPage";

// ── Critical account-flow pages — STATIC imports (continued) ──
import ProfilePage from "./pages/ProfilePage";
// PublicFormPage — statically imported so /f/$slug never hits a missing-chunk error
import PublicFormPage from "./pages/PublicFormPage";

// ── Critical nav pages — STATIC imports (no lazy, no chunk 404 risk) ──
import LeadFormsPage from "./pages/LeadFormsPage";

// ── Non-critical pages — lazy loaded ──
const LeadsPage = lazy(() => import("./pages/LeadsPage"));
const LeadDetailPage = lazy(() => import("./pages/LeadDetailPage"));
const PipelinePage = lazy(() => import("./pages/PipelinePage"));
const PowerDialerPage = lazy(() => import("./pages/PowerDialerPage"));
const TemplatesPage = lazy(() => import("./pages/TemplatesPage"));
const QueuePage = lazy(() => import("./pages/QueuePage"));
const ColdCallScriptPage = lazy(() => import("./pages/ColdCallScriptPage"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const TwilioSetupPage = lazy(() => import("./pages/TwilioSetupPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AffiliateSignupPage = lazy(() => import("./pages/AffiliateSignupPage"));
const AffiliateDashboardPage = lazy(
  () => import("./pages/AffiliateDashboardPage"),
);
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const DetailedPrivacyPolicyPage = lazy(
  () => import("./pages/DetailedPrivacyPolicyPage"),
);
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AdvertisePage = lazy(() => import("./pages/AdvertisePage"));
const SocialMediaPage = lazy(() => import("./pages/SocialMediaPage"));
const LocalSeoPage = lazy(() => import("./pages/LocalSeoPage"));
const ImageCreatorPage = lazy(() => import("./pages/ImageCreatorPage"));
const DripPage = lazy(() => import("./pages/DripPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      </Layout>
    </ProtectedRoute>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" richColors />
      <InstallPrompt />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// /lander alias — same public landing page, no auth required
const landerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lander",
  component: LandingPage,
});

// /login — legacy route kept so old links/bookmarks don't 404.
// LoginPage now just renders <Navigate to="/" /> — no auth UI, no popup.
// All auth logic lives in LandingPage.tsx.
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// /security-login — legacy alias, same redirect to /
const securityLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/security-login",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

// Critical path — static import, zero chunk-load risk
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Layout>
        <ErrorBoundary>
          <DashboardPage />
        </ErrorBoundary>
      </Layout>
    </ProtectedRoute>
  ),
});

const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads",
  component: () => (
    <PageShell>
      <LeadsPage />
    </PageShell>
  ),
});

const leadDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads/$id",
  component: () => (
    <PageShell>
      <LeadDetailPage />
    </PageShell>
  ),
});

const pipelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pipeline",
  component: () => (
    <PageShell>
      <PipelinePage />
    </PageShell>
  ),
});

const powerDialerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/power-dialer",
  component: () => (
    <PageShell>
      <PowerDialerPage />
    </PageShell>
  ),
});

const templatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/templates",
  component: () => (
    <PageShell>
      <TemplatesPage />
    </PageShell>
  ),
});

// Legacy /birthday-queue → redirect to /queue
const birthdayQueueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/birthday-queue",
  beforeLoad: () => {
    throw redirect({ to: "/queue" });
  },
  component: () => null,
});

const queueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/queue",
  component: () => (
    <PageShell>
      <QueuePage />
    </PageShell>
  ),
});

const leadFormsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lead-forms",
  component: () => (
    <PageShell>
      <LeadFormsPage />
    </PageShell>
  ),
});

// Public form routes kept as stubs so old bookmarks don't hard-404
const shortPublicFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/f/$slug",
  component: () => (
    <ErrorBoundary>
      <PublicFormPage />
    </ErrorBoundary>
  ),
});

// Legacy redirect
const publicFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lead-forms/public/$slug",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    // skipPaymentGate + skipLiabilityGate: newly-paid users coming from /agreement
    // must be able to reach profile without hitting the payment gate or modal.
    <ProtectedRoute skipPaymentGate skipLiabilityGate>
      <ErrorBoundary>
        <ProfilePage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

const coldCallScriptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cold-call-script",
  component: () => (
    <PageShell>
      <ColdCallScriptPage />
    </PageShell>
  ),
});

const twilioSetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/twilio-setup",
  component: () => (
    <PageShell>
      <TwilioSetupPage />
    </PageShell>
  ),
});

const videoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/video",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <VideoPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const affiliateSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/affiliate-signup",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <AffiliateSignupPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const affiliateDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/affiliate",
  component: () => (
    <PageShell>
      <AffiliateDashboardPage />
    </PageShell>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <PrivacyPolicyPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const detailedPrivacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy-full",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <DetailedPrivacyPolicyPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <TermsPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const advertiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advertise",
  component: () => (
    <PageShell>
      <AdvertisePage />
    </PageShell>
  ),
});

const socialMediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/social-media",
  component: () => (
    <PageShell>
      <SocialMediaPage />
    </PageShell>
  ),
});

const localSeoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/local-seo",
  component: () => (
    <PageShell>
      <LocalSeoPage />
    </PageShell>
  ),
});

const imageCreatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/image-creator",
  component: () => (
    <PageShell>
      <ImageCreatorPage />
    </PageShell>
  ),
});

const dripRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/drip",
  component: () => (
    <PageShell>
      <DripPage />
    </PageShell>
  ),
});

// Critical path — static import, zero chunk-load risk
// /activate: post-auth screen for pre-registered users who log in directly.
const activateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activate",
  component: () => (
    <ProtectedRoute skipPaymentGate skipLiabilityGate>
      <ErrorBoundary>
        <ActivatePage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

// Critical path — static import, zero chunk-load risk
// /activate-new: post-auth screen for users coming from /pre-signup.
// Saves profile, checks pre-registration, then routes to /dashboard.
const activateNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/activate-new",
  component: () => (
    <ProtectedRoute skipPaymentGate skipLiabilityGate>
      <ErrorBoundary>
        <ActivateNewPage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

// Critical path — /pre-signup: public profile form before Internet Identity.
// NOT behind ProtectedRoute — no auth required.
const preSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pre-signup",
  component: () => (
    <ErrorBoundary>
      <PreSignupPage />
    </ErrorBoundary>
  ),
});

// Critical path — static import, zero chunk-load risk
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: () => (
    <ProtectedRoute skipPaymentGate skipLiabilityGate>
      <ErrorBoundary>
        <PaymentPage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

// Critical path — static import, zero chunk-load risk
// /agreement sits between /payment and /profile in the onboarding flow.
// skipLiabilityGate so the modal doesn't interrupt; user accepts here instead.
const agreementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agreement",
  component: () => (
    <ProtectedRoute skipPaymentGate skipLiabilityGate>
      <ErrorBoundary>
        <AgreementPage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

// Critical path — static import, zero chunk-load risk
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => (
    <ProtectedRoute skipPaymentGate>
      <ErrorBoundary>
        <OnboardingPage />
      </ErrorBoundary>
    </ProtectedRoute>
  ),
});

// Zoom callback — OAuth removed, redirect to dashboard
const zoomCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zoom-callback",
  component: () => (
    <ErrorBoundary>
      <ZoomCallbackPage />
    </ErrorBoundary>
  ),
});

// ── Blog routes — lazy loaded, public, no auth required ──
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <BlogPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <BlogPostPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const ComparePostPage = lazy(() => import("./pages/ComparePostPage"));

const comparePostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare/$slug",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <ComparePostPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <PricingPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

const supportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/support",
  component: () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <SupportPage />
      </Suspense>
    </ErrorBoundary>
  ),
});

// Catch-all: any path not matched above redirects to /
function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/" });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground gap-4">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">Redirecting you home…</p>
    </div>
  );
}

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  landerRoute,
  loginRoute,
  securityLoginRoute,
  videoRoute,
  dashboardRoute,
  leadsRoute,
  leadDetailRoute,
  pipelineRoute,
  powerDialerRoute,
  templatesRoute,
  birthdayQueueRoute,
  queueRoute,
  leadFormsRoute,
  shortPublicFormRoute,
  publicFormRoute,
  profileRoute,
  coldCallScriptRoute,
  twilioSetupRoute,
  affiliateSignupRoute,
  affiliateDashboardRoute,
  adminRoute,
  privacyPolicyRoute,
  detailedPrivacyRoute,
  termsRoute,
  advertiseRoute,
  socialMediaRoute,
  localSeoRoute,
  imageCreatorRoute,
  dripRoute,
  paymentRoute,
  agreementRoute,
  activateRoute,
  activateNewRoute,
  preSignupRoute,
  onboardingRoute,
  zoomCallbackRoute,
  pricingRoute,
  supportRoute,
  blogRoute,
  blogPostRoute,
  comparePostRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
