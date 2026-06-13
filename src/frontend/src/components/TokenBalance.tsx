import { Coins, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useTokens } from "../hooks/useTokens";
import { BuyTokensModal } from "./BuyTokensModal";

interface TokenBalanceProps {
  showLtai?: boolean;
}

export function TokenBalance({ showLtai = false }: TokenBalanceProps) {
  const { taiTokens, ltaiTokens, isLoading } = useTokens();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-7 w-24 rounded-full bg-muted animate-pulse" />
        {showLtai && (
          <div className="h-7 w-28 rounded-full bg-muted animate-pulse" />
        )}
      </div>
    );
  }

  const taiEmpty = taiTokens === 0;
  const ltaiEmpty = ltaiTokens === 0;

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2"
        data-ocid="token-balance.panel"
      >
        {/* tAI badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            taiEmpty
              ? "border-red-300 bg-red-50 text-red-700"
              : "border-primary/30 bg-primary/5 text-primary"
          }`}
          style={
            taiEmpty
              ? {}
              : {
                  borderColor: "oklch(0.22 0.12 264 / 0.25)",
                  color: "oklch(0.22 0.12 264)",
                }
          }
          data-ocid="token-balance.tai"
          title="General AI tokens (tAI)"
        >
          <Coins className="w-3.5 h-3.5 shrink-0" />
          {taiEmpty ? <span>0 tAI tokens</span> : <span>{taiTokens} tAI</span>}
        </div>

        {/* LtAI badge — only on landing page section */}
        {showLtai && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              ltaiEmpty
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-amber-400/40 bg-amber-50 text-amber-700"
            }`}
            data-ocid="token-balance.ltai"
            title="Landing Page AI tokens (LtAI)"
          >
            <Coins className="w-3.5 h-3.5 shrink-0" />
            {ltaiEmpty ? (
              <span>0 LtAI tokens</span>
            ) : (
              <span>{ltaiTokens} LtAI</span>
            )}
          </div>
        )}

        {/* Buy More button */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
          style={{ background: "oklch(0.56 0.16 44)" }}
          data-ocid="token-balance.buy_more_button"
        >
          <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
          Buy More Credits
        </button>
      </div>

      {/* Insufficient tokens inline warning */}
      {taiEmpty && (
        <p
          className="text-xs mt-1.5 flex items-center gap-1"
          style={{ color: "oklch(0.52 0.18 22)" }}
          data-ocid="token-balance.empty_state"
        >
          You have 0 tAI tokens remaining.{" "}
          <button
            type="button"
            className="underline font-semibold hover:opacity-80"
            onClick={() => setModalOpen(true)}
          >
            Purchase more to continue.
          </button>
        </p>
      )}

      <BuyTokensModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        showLtai={showLtai}
      />
    </>
  );
}
