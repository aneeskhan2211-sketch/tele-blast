import { Skeleton } from "@/components/ui/skeleton";
import { Image } from "lucide-react";
import { FeatureLockOverlay } from "../components/FeatureLockOverlay";
import { TokenBalance } from "../components/TokenBalance";
import { useFeatureAccess } from "../hooks/useFeatureAccess";
import { ImageCreatorTab } from "./LocalSeoPage";

export default function ImageCreatorPage() {
  const { hasAccess, isLoading: accessLoading } = useFeatureAccess();

  const hasFeatureAccess = !accessLoading && hasAccess;

  if (accessLoading) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-6 py-5 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto px-3 sm:px-6 py-5 sm:py-8 space-y-5 relative overflow-hidden"
      data-ocid="image_creator.page"
    >
      {/* Admin-revoked overlay */}
      {!accessLoading && !hasAccess && <FeatureLockOverlay />}

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <Image className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Image Creator
          </h1>
          <p className="text-sm text-muted-foreground">
            Create professional promo images with your logo, photo, and message
          </p>
        </div>
      </div>

      {hasFeatureAccess && <TokenBalance showLtai={false} />}

      <ImageCreatorTab hasAccess={hasFeatureAccess} />
    </div>
  );
}
