import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

const LIABILITY_ITEMS = [
  "You are 18 or older and a U.S.‑based professional authorized to use communication tools for business purposes.",
  "All information you provide during registration is accurate and complete.",
  "Tele‑Blast is a U.S. service, and your information will be stored in the United States.",
  "You will use Tele‑Blast only for lawful, compliant communication, including all federal and state rules related to privacy, data protection, and messaging laws (such as HIPAA and the Telephone Consumer Protection Act).",
  "You will not impersonate anyone, misrepresent your identity, or use misleading caller ID or sender information.",
  "You will not misuse, overload, or interfere with the Tele‑Blast platform.",
  "You will not send spam, junk messages, or unauthorized promotional content through Tele‑Blast.",
  "You will not violate any agreements you have with your employer or any other organization.",
];

interface LiabilityModalProps {
  onAccept: () => void;
}

export function LiabilityModal({ onAccept }: LiabilityModalProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-4"
      style={{ background: "rgba(18, 28, 56, 0.92)" }}
      data-ocid="liability.dialog"
    >
      {/*
        Mobile: full-screen sheet (rounded top corners only)
        Desktop: centered card with max-h-[90vh]
      */}
      <div
        className="
          bg-card flex flex-col
          w-full h-[100dvh]
          md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-xl
          rounded-t-2xl
          border border-border shadow-2xl
        "
      >
        {/* Header — never scrolls away */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Terms of Use
            </h2>
            <p className="text-sm text-muted-foreground">
              Please review and accept before continuing
            </p>
          </div>
        </div>

        {/*
          Native scroll container — no ScrollArea wrapper.
          flex-1 + min-h-0 lets it shrink to fit the available
          flex column height and enables overflow-y-auto to work.
          -webkit-overflow-scrolling:touch gives momentum scroll on iOS.
        */}
        <div
          className="flex-1 min-h-0 overflow-y-auto px-5 py-4"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <p className="text-sm font-medium text-foreground mb-4">
            By using Tele‑Blast, you confirm that:
          </p>
          <ul className="space-y-3" data-ocid="liability.terms_list">
            {LIABILITY_ITEMS.map((item) => (
              <li
                key={item.slice(0, 40)}
                className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="mt-0.5 shrink-0 text-primary font-bold">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Checkbox + button live INSIDE the scroll container */}
          <div className="mt-6 pt-4 border-t border-border space-y-4 pb-6">
            <div
              className="flex items-start gap-3"
              data-ocid="liability.agree_checkbox"
            >
              <Checkbox
                id="liability-agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5 shrink-0"
              />
              <label
                htmlFor="liability-agree"
                className="text-sm text-foreground leading-relaxed select-none cursor-pointer"
              >
                I have read and agree to the above terms
              </label>
            </div>

            <Button
              className="w-full"
              disabled={!agreed}
              onClick={onAccept}
              data-ocid="liability.accept_button"
            >
              Accept &amp; Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
