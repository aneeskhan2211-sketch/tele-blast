import { Coins, Star, X, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  usePurchaseLtaiTokens,
  usePurchaseTaiTokens,
} from "../hooks/useTokens";

interface TokenPackage {
  packageId: string;
  tokens: number;
  price: number;
  pricePerToken: string;
  highlight?: boolean;
}

const TAI_PACKAGES: TokenPackage[] = [
  { packageId: "pkg_25", tokens: 25, price: 5, pricePerToken: "$0.20/token" },
  { packageId: "pkg_50", tokens: 50, price: 9, pricePerToken: "$0.18/token" },
  {
    packageId: "pkg_100",
    tokens: 100,
    price: 15,
    pricePerToken: "$0.15/token",
    highlight: true,
  },
  {
    packageId: "pkg_200",
    tokens: 200,
    price: 25,
    pricePerToken: "$0.125/token",
  },
];

const LTAI_PACKAGES: TokenPackage[] = [
  { packageId: "ltai_5", tokens: 5, price: 1.25, pricePerToken: "$0.25/token" },
  {
    packageId: "ltai_10",
    tokens: 10,
    price: 2.5,
    pricePerToken: "$0.25/token",
  },
  {
    packageId: "ltai_25",
    tokens: 25,
    price: 6.25,
    pricePerToken: "$0.25/token",
  },
];

interface BuyTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
  showLtai?: boolean;
}

function PackageCard({
  pkg,
  type,
  onPurchase,
}: {
  pkg: TokenPackage;
  type: "tai" | "ltai";
  onPurchase: (packageId: string) => Promise<unknown>;
}) {
  const isHighlight = pkg.highlight;
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      await onPurchase(pkg.packageId);
      toast.success(
        `${pkg.tokens} ${type === "ltai" ? "LtAI" : "tAI"} tokens added to your account!`,
      );
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Purchase failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-4 transition-all ${
        isHighlight ? "shadow-md" : "hover:shadow-sm"
      }`}
      style={
        isHighlight
          ? {
              border: "2px solid oklch(0.56 0.16 44)",
              background: "oklch(0.56 0.16 44 / 0.04)",
            }
          : {
              border: "1px solid oklch(0.91 0 0)",
              background: "oklch(0.99 0 0)",
            }
      }
      data-ocid={`buy-tokens.${type}-package-${pkg.packageId}`}
    >
      {isHighlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold text-white"
          style={{ background: "oklch(0.56 0.16 44)" }}
        >
          <Star className="w-3 h-3" />
          Best Value
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                type === "ltai"
                  ? "oklch(0.95 0.06 85)"
                  : "oklch(0.22 0.12 264 / 0.08)",
            }}
          >
            {type === "ltai" ? (
              <Zap
                className="w-4 h-4"
                style={{ color: "oklch(0.56 0.12 85)" }}
              />
            ) : (
              <Coins
                className="w-4 h-4"
                style={{ color: "oklch(0.22 0.12 264)" }}
              />
            )}
          </div>
          <div>
            <p className="text-base font-bold text-foreground leading-none">
              {pkg.tokens} {type === "ltai" ? "LtAI" : "tAI"} tokens
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {pkg.pricePerToken}
            </p>
          </div>
        </div>
        <span
          className="text-2xl font-extrabold"
          style={{
            color: isHighlight ? "oklch(0.56 0.16 44)" : "oklch(0.22 0.12 264)",
          }}
        >
          ${pkg.price % 1 === 0 ? pkg.price : pkg.price.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={handlePurchase}
        disabled={loading}
        className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 active:scale-95 mt-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{
          background: isHighlight
            ? "oklch(0.56 0.16 44)"
            : "oklch(0.22 0.12 264)",
        }}
        data-ocid={`buy-tokens.purchase_button-${pkg.packageId}`}
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          "Purchase"
        )}
      </button>
    </div>
  );
}

export function BuyTokensModal({
  isOpen,
  onClose,
  showLtai = false,
}: BuyTokensModalProps) {
  const purchaseTai = usePurchaseTaiTokens();
  const purchaseLtai = usePurchaseLtaiTokens();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      data-ocid="buy-tokens.dialog"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: "oklch(0.99 0 0)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <div className="flex items-center gap-2.5">
            <Coins className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white">Buy AI Tokens</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors rounded-lg p-1"
            aria-label="Close"
            data-ocid="buy-tokens.close_button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* tAI packages */}
          <div>
            <div className="mb-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Coins
                  className="w-4 h-4"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                />
                tAI Tokens — General AI
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Used for all AI features: templates, cold call scripts, ad copy,
                SEO, and smart search.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TAI_PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.packageId}
                  pkg={pkg}
                  type="tai"
                  onPurchase={purchaseTai}
                />
              ))}
            </div>
          </div>

          {/* LtAI packages — only shown when requested */}
          {showLtai && (
            <div>
              <div
                className="h-px w-full mb-6"
                style={{ background: "oklch(0.93 0 0)" }}
              />
              <div className="mb-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Zap
                    className="w-4 h-4"
                    style={{ color: "oklch(0.56 0.12 85)" }}
                  />
                  LtAI Tokens — Landing Page AI
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Exclusively for AI-powered landing page customization
                  (requires Pro + Landing plan or higher).
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {LTAI_PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.packageId}
                    pkg={pkg}
                    type="ltai"
                    onPurchase={purchaseLtai}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <p
            className="text-xs text-center rounded-xl px-4 py-3"
            style={{
              background: "oklch(0.22 0.12 264 / 0.05)",
              color: "oklch(0.48 0.06 264)",
            }}
          >
            Tokens are added immediately after payment. All purchases are final.
          </p>
        </div>
      </div>
    </div>
  );
}
