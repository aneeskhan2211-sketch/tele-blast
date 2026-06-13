import { useNavigate } from "@tanstack/react-router";
import { Cake, X } from "lucide-react";
import type { Lead } from "../types";

interface BirthdayNotificationProps {
  leads: Lead[];
  onDismiss: () => void;
}

function isBirthdayToday(birthday: string | null | undefined): boolean {
  if (!birthday) return false;
  const today = new Date();
  const [, month, day] = birthday.split("-").map(Number);
  return today.getMonth() + 1 === month && today.getDate() === day;
}

export function BirthdayNotification({
  leads,
  onDismiss,
}: BirthdayNotificationProps) {
  const navigate = useNavigate();
  const now = new Date();
  const isAfter9am = now.getHours() >= 9;

  if (!isAfter9am) return null;

  const todayBirthdays = leads.filter((lead) => isBirthdayToday(lead.birthday));

  if (todayBirthdays.length === 0) return null;

  const message =
    todayBirthdays.length === 1
      ? `🎂 Don't forget — ${todayBirthdays[0].name || "A lead"} has a birthday today!`
      : `🎂 ${todayBirthdays.length} leads have birthdays today! Check your Birthday Queue.`;

  return (
    <div
      className="relative flex items-center z-40 w-full shrink-0"
      style={{ background: "oklch(0.65 0.20 44)" }}
      role="alert"
      aria-live="polite"
      data-ocid="birthday-notification-banner"
    >
      <button
        type="button"
        onClick={() => navigate({ to: "/birthday-queue" })}
        className="flex-1 flex items-center gap-2 px-4 py-3 text-white font-medium text-sm min-w-0 text-left hover:bg-white/10 active:bg-white/20 transition-colors"
        data-ocid="birthday-notification-link"
      >
        <Cake className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{message}</span>
      </button>
      <button
        type="button"
        onClick={onDismiss}
        className="flex items-center justify-center w-10 h-10 shrink-0 text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors rounded"
        aria-label="Dismiss birthday reminder"
        data-ocid="birthday-notification-dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
