import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddEmailTemplate,
  useAddSmsTemplate,
  useDeleteEmailTemplate,
  useDeleteSmsTemplate,
  useEmailTemplates,
  useSmsTemplates,
  useUpdateEmailTemplate,
  useUpdateSmsTemplate,
} from "../hooks/useTemplates";
import type { EmailTemplate, SmsTemplate } from "../types";
import { spinText } from "../utils/textSpinner";

// ─── Spin Versions Modal ──────────────────────────────────────────────────────

interface SpinModalProps {
  body: string;
  templateName: string;
  onClose: () => void;
}

const VERSION_LABELS = ["version-one", "version-two", "version-three"] as const;

function SpinVersionsModal({ body, templateName, onClose }: SpinModalProps) {
  const versions = spinText(body);
  const [copied, setCopied] = useState<number | null>(null);

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(idx);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      data-ocid="spin.dialog"
    >
      <dialog
        open
        className="relative bg-card rounded-t-2xl sm:rounded-xl shadow-2xl w-full sm:max-w-lg m-0 p-0 border-0 overflow-y-auto"
        style={{
          maxHeight:
            "min(90vh, calc(100dvh - env(safe-area-inset-bottom, 0px) - 80px))",
        }}
        aria-label="Spin text variations"
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: "oklch(0.22 0.12 264)" }}
        >
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-4 h-4 text-white" />
            <h2 className="text-base font-semibold text-white">
              Spin — 3 Variations
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors rounded-md p-1"
            aria-label="Close"
            data-ocid="spin.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-sm text-muted-foreground">
            3 variations of{" "}
            <span className="font-semibold text-foreground">
              {templateName}
            </span>
            . Each is genuinely reworded. Copy any version to use it.
          </p>
        </div>

        {/* Versions */}
        <div className="px-5 pb-5 space-y-3">
          {versions.map((v, i) => (
            <div
              key={VERSION_LABELS[i] ?? `version-${i}`}
              className="rounded-xl border border-border bg-background p-4 space-y-2"
              data-ocid={`spin.version.${i + 1}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.22 0.12 264)" }}
                >
                  Version {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(v, i)}
                  className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors hover:bg-muted min-h-[32px]"
                  style={{
                    color:
                      copied === i
                        ? "oklch(0.46 0.14 160)"
                        : "oklch(0.22 0.12 264)",
                  }}
                  data-ocid={`spin.copy_button.${i + 1}`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied === i ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {v}
              </p>
            </div>
          ))}
        </div>
      </dialog>
    </div>
  );
}

// ─── Email Template Form ──────────────────────────────────────────────────────

interface EmailFormState {
  name: string;
  subject: string;
  body: string;
}

const emailEmpty: EmailFormState = { name: "", subject: "", body: "" };

function EmailTemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial?: EmailFormState;
  onSave: (v: EmailFormState) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<EmailFormState>(initial ?? emailEmpty);
  const set =
    (k: keyof EmailFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const valid = form.name.trim() && form.subject.trim() && form.body.trim();

  return (
    <div className="space-y-4" data-ocid="email-template-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="et-name">Template name</Label>
          <Input
            id="et-name"
            placeholder="e.g. Follow-up Introduction"
            value={form.name}
            onChange={set("name")}
            data-ocid="email-template.name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="et-subject">Subject line</Label>
          <Input
            id="et-subject"
            placeholder="e.g. Quick question about your business"
            value={form.subject}
            onChange={set("subject")}
            data-ocid="email-template.subject_input"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="et-body">Message body</Label>
        <Textarea
          id="et-body"
          placeholder="Write your email template here..."
          value={form.body}
          onChange={set("body")}
          rows={6}
          className="resize-y"
          data-ocid="email-template.body_textarea"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="email-template.cancel_button"
        >
          <X className="w-4 h-4 mr-1.5" />
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => valid && onSave(form)}
          disabled={!valid || isSaving}
          data-ocid="email-template.save_button"
        >
          {isSaving ? "Saving…" : "Save template"}
        </Button>
      </div>
    </div>
  );
}

// ─── SMS Template Form ────────────────────────────────────────────────────────

interface SmsFormState {
  name: string;
  body: string;
}

const smsEmpty: SmsFormState = { name: "", body: "" };

function SmsTemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial?: SmsFormState;
  onSave: (v: SmsFormState) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<SmsFormState>(initial ?? smsEmpty);
  const set =
    (k: keyof SmsFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const valid = form.name.trim() && form.body.trim();

  return (
    <div className="space-y-4" data-ocid="sms-template-form">
      <div className="space-y-1.5">
        <Label htmlFor="sms-name">Template name</Label>
        <Input
          id="sms-name"
          placeholder="e.g. Initial Outreach"
          value={form.name}
          onChange={set("name")}
          data-ocid="sms-template.name_input"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="sms-body">Message body</Label>
        <Textarea
          id="sms-body"
          placeholder="Write your SMS template here..."
          value={form.body}
          onChange={set("body")}
          rows={4}
          className="resize-y"
          data-ocid="sms-template.body_textarea"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            {form.body.length}/160 characters
          </p>
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded border border-primary/30 hover:bg-primary/5"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                body: `${prev.body}{{first_name}}`,
              }))
            }
            title="Insert first name placeholder"
          >
            + Insert &#123;&#123;first_name&#125;&#125;
          </button>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          data-ocid="sms-template.cancel_button"
        >
          <X className="w-4 h-4 mr-1.5" />
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={() => valid && onSave(form)}
          disabled={!valid || isSaving}
          data-ocid="sms-template.save_button"
        >
          {isSaving ? "Saving…" : "Save template"}
        </Button>
      </div>
    </div>
  );
}

// ─── Email Templates List ─────────────────────────────────────────────────────

function EmailTemplatesList() {
  const { data: templates = [], isLoading, isError } = useEmailTemplates();
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLoading) {
      timerRef.current = setTimeout(() => setTimedOut(true), 10_000);
    } else {
      setTimedOut(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);
  const addMut = useAddEmailTemplate();
  const updateMut = useUpdateEmailTemplate();
  const deleteMut = useDeleteEmailTemplate();

  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleAdd = async (form: EmailFormState) => {
    try {
      await addMut.mutateAsync(form);
      toast.success("Email template saved");
      setShowAdd(false);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to save email template. Please try again.",
      );
    }
  };

  const handleUpdate = async (id: string, form: EmailFormState) => {
    try {
      await updateMut.mutateAsync({ id, ...form });
      toast.success("Template updated");
      setEditId(null);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to update email template. Please try again.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Template deleted");
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete email template. Please try again.",
      );
    }
  };

  if (isLoading && !timedOut) {
    return (
      <div className="space-y-3" data-ocid="email-templates.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (timedOut || isError) {
    return (
      <div
        className="text-center py-12 text-muted-foreground"
        data-ocid="email-templates.error_state"
      >
        <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium text-sm">Couldn't load templates.</p>
        <p className="text-xs mt-1">
          Check your connection and try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action buttons row */}
      {!showAdd && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdd(true)}
            className="border-dashed flex-1 sm:flex-none"
            data-ocid="email-template.add_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Template
          </Button>
        </div>
      )}

      {/* Add new form */}
      {showAdd && (
        <Card className="border-primary/30 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">
              New Email Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmailTemplateForm
              initial={emailEmpty}
              onSave={handleAdd}
              onCancel={() => setShowAdd(false)}
              isSaving={addMut.isPending}
            />
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {templates.length === 0 && !showAdd && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="email-templates.empty_state"
        >
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No templates yet.</p>
          <p className="text-sm mt-1">Create one to get started.</p>
        </div>
      )}

      {/* Template cards */}
      {templates.map((t: EmailTemplate, idx: number) => (
        <Card key={t.id} data-ocid={`email-template.item.${idx + 1}`}>
          {editId === t.id ? (
            <CardContent className="pt-4">
              <p className="text-sm font-medium mb-3 text-foreground">
                Edit Email Template
              </p>
              <EmailTemplateForm
                initial={{ name: t.name, subject: t.subject, body: t.body }}
                onSave={(form) => handleUpdate(t.id, form)}
                onCancel={() => setEditId(null)}
                isSaving={updateMut.isPending}
              />
            </CardContent>
          ) : (
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground truncate">
                      {t.name}
                    </p>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      Email
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    <span className="font-medium">Subject:</span> {t.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {t.body}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {confirmDeleteId === t.id ? (
                    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-1.5">
                      <span className="text-xs text-destructive font-medium">
                        Delete?
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 text-xs px-2"
                        onClick={() => handleDelete(t.id)}
                        disabled={deleteMut.isPending}
                        data-ocid={`email-template.confirm_button.${idx + 1}`}
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs px-2"
                        onClick={() => setConfirmDeleteId(null)}
                        data-ocid={`email-template.cancel_button.${idx + 1}`}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setEditId(t.id)}
                        aria-label="Edit template"
                        data-ocid={`email-template.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setConfirmDeleteId(t.id)}
                        aria-label="Delete template"
                        data-ocid={`email-template.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
      {/* Spin checkbox helper note — shown when templates exist */}
      {templates.length > 0 && (
        <p className="text-xs text-muted-foreground px-1">
          Tip: Use the Spin feature on SMS templates to generate 3 variations of
          a message.
        </p>
      )}
    </div>
  );
}

// ─── SMS Templates List ───────────────────────────────────────────────────────

function SmsTemplatesList() {
  const { data: templates = [], isLoading, isError } = useSmsTemplates();
  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLoading) {
      timerRef.current = setTimeout(() => setTimedOut(true), 10_000);
    } else {
      setTimedOut(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isLoading]);
  const addMut = useAddSmsTemplate();
  const updateMut = useUpdateSmsTemplate();
  const deleteMut = useDeleteSmsTemplate();

  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [spinTemplate, setSpinTemplate] = useState<SmsTemplate | null>(null);

  // Per-card spin checkbox state: maps template id -> boolean
  const [spinChecked, setSpinChecked] = useState<Record<string, boolean>>({});

  const handleAdd = async (form: SmsFormState) => {
    try {
      await addMut.mutateAsync(form);
      toast.success("SMS template saved");
      setShowAdd(false);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to save SMS template. Please try again.",
      );
    }
  };

  const handleUpdate = async (id: string, form: SmsFormState) => {
    try {
      await updateMut.mutateAsync({ id, ...form });
      toast.success("Template updated");
      setEditId(null);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to update SMS template. Please try again.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMut.mutateAsync(id);
      toast.success("Template deleted");
      setConfirmDeleteId(null);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete SMS template. Please try again.",
      );
    }
  };

  function toggleSpin(id: string, checked: boolean) {
    setSpinChecked((prev) => ({ ...prev, [id]: checked }));
    if (checked) {
      const template = (templates as SmsTemplate[]).find((t) => t.id === id);
      if (template) setSpinTemplate(template);
    } else {
      setSpinTemplate(null);
    }
  }

  if (isLoading && !timedOut) {
    return (
      <div className="space-y-3" data-ocid="sms-templates.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (timedOut || isError) {
    return (
      <div
        className="text-center py-12 text-muted-foreground"
        data-ocid="sms-templates.error_state"
      >
        <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="font-medium text-sm">Couldn't load templates.</p>
        <p className="text-xs mt-1">
          Check your connection and try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Spin versions modal */}
      {spinTemplate && (
        <SpinVersionsModal
          body={spinTemplate.body}
          templateName={spinTemplate.name}
          onClose={() => {
            setSpinTemplate(null);
            setSpinChecked({});
          }}
        />
      )}

      {/* Action buttons row */}
      {!showAdd && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdd(true)}
            className="border-dashed flex-1 sm:flex-none"
            data-ocid="sms-template.add_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Template
          </Button>
        </div>
      )}

      {/* Add new form */}
      {showAdd && (
        <Card className="border-primary/30 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">
              New SMS Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SmsTemplateForm
              initial={smsEmpty}
              onSave={handleAdd}
              onCancel={() => setShowAdd(false)}
              isSaving={addMut.isPending}
            />
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {templates.length === 0 && !showAdd && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="sms-templates.empty_state"
        >
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No templates yet.</p>
          <p className="text-sm mt-1">Create one to get started.</p>
        </div>
      )}

      {/* Template cards */}
      {(templates as SmsTemplate[]).map((t, idx) => (
        <Card key={t.id} data-ocid={`sms-template.item.${idx + 1}`}>
          {editId === t.id ? (
            <CardContent className="pt-4">
              <p className="text-sm font-medium mb-3 text-foreground">
                Edit SMS Template
              </p>
              <SmsTemplateForm
                initial={{ name: t.name, body: t.body }}
                onSave={(form) => handleUpdate(t.id, form)}
                onCancel={() => setEditId(null)}
                isSaving={updateMut.isPending}
              />
            </CardContent>
          ) : (
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-foreground truncate">
                      {t.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0 border-accent/50 text-accent"
                    >
                      SMS
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {t.body}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {t.body.length} chars
                  </p>

                  {/* Spin checkbox */}
                  <div
                    className="flex items-center gap-2 mt-2.5 pt-2 border-t border-border/60"
                    data-ocid={`sms-template.spin_checkbox.${idx + 1}`}
                  >
                    <Checkbox
                      id={`spin-${t.id}`}
                      checked={spinChecked[t.id] ?? false}
                      onCheckedChange={(checked) =>
                        toggleSpin(t.id, checked === true)
                      }
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor={`spin-${t.id}`}
                      className="text-xs font-medium cursor-pointer select-none flex items-center gap-1.5"
                      style={{ color: "oklch(0.38 0.10 264)" }}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <RefreshCw className="w-3 h-3" />
                      Spin into 3 versions
                    </label>
                    {spinChecked[t.id] && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        — dialog will open
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {confirmDeleteId === t.id ? (
                    <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-1.5">
                      <span className="text-xs text-destructive font-medium">
                        Delete?
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-6 text-xs px-2"
                        onClick={() => handleDelete(t.id)}
                        disabled={deleteMut.isPending}
                        data-ocid={`sms-template.confirm_button.${idx + 1}`}
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 text-xs px-2"
                        onClick={() => setConfirmDeleteId(null)}
                        data-ocid={`sms-template.cancel_button.${idx + 1}`}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-foreground"
                        onClick={() => setEditId(t.id)}
                        aria-label="Edit template"
                        data-ocid={`sms-template.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setConfirmDeleteId(t.id)}
                        aria-label="Delete template"
                        data-ocid={`sms-template.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative overflow-hidden"
      data-ocid="templates.page"
    >
      {/* Page header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Templates
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage reusable email and SMS message templates. Use{" "}
          <code className="text-xs bg-muted px-1 rounded">
            &#123;&#123;first_name&#125;&#125;
          </code>{" "}
          to personalize messages with each lead's first name. Check "Spin" to
          generate 3 unique, genuinely reworded variations instantly.
        </p>
      </div>

      {/* Tabs — full width on mobile */}
      <Tabs defaultValue="sms" data-ocid="templates.tab">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
            value="sms"
            className="flex items-center gap-1.5 min-h-[48px] text-sm"
            data-ocid="templates.sms_tab"
          >
            <MessageSquare className="w-4 h-4" />
            SMS
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="flex items-center gap-1.5 min-h-[48px] text-sm"
            data-ocid="templates.email_tab"
          >
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sms" className="mt-4">
          <SmsTemplatesList />
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <EmailTemplatesList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
