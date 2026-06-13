/**
 * IMessageCheckbox — reusable "Send via iMessage" checkbox.
 *
 * When checked, the send action opens the native sms: URI (iMessage on iPhone).
 * When unchecked, Twilio is used (if configured), with sms: as fallback.
 */
import { MessageCircle } from "lucide-react";

interface IMessageCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

export function IMessageCheckbox({
  checked,
  onChange,
  className = "",
}: IMessageCheckboxProps) {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none group ${className}`}
      data-ocid="imessage.checkbox"
    >
      {/* Custom styled checkbox */}
      <div className="relative flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          aria-label="Send via iMessage"
        />
        <div
          className={`w-4 h-4 rounded border-2 transition-all duration-150 flex items-center justify-center
            ${
              checked
                ? "bg-accent border-accent"
                : "border-border bg-background group-hover:border-accent/60"
            }`}
        >
          {checked && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 10 8"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              role="img"
            >
              <title>Checked</title>
              <path d="M1 4l2.5 2.5L9 1" />
            </svg>
          )}
        </div>
      </div>

      {/* iMessage icon + label */}
      <span className="flex items-center gap-1.5 text-sm text-foreground">
        <MessageCircle
          className={`w-4 h-4 transition-colors ${checked ? "text-[oklch(0.55_0.18_215)]" : "text-muted-foreground"}`}
          style={{ color: checked ? "oklch(0.55 0.18 215)" : undefined }}
        />
        <span
          className={`font-medium transition-colors ${checked ? "text-foreground" : "text-muted-foreground"}`}
        >
          Send via iMessage
        </span>
      </span>
    </label>
  );
}
