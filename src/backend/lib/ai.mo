import LeadTypes "../types/leads";
import Text "mo:core/Text";

module {

  // ── JSON helpers ───────────────────────────────────────────────────

  // Escape double-quotes and newlines in a string for JSON embedding
  public func jsonEscape(s : Text) : Text {
    s.replace(#text "\"", "\\\"").replace(#text "\n", "\\n").replace(#text "\r", "")
  };

  // Serialize a Lead record to compact JSON for context
  public func leadToJson(l : LeadTypes.Lead) : Text {
    "{\"id\":" # l.id.toText()
    # ",\"name\":\"" # jsonEscape(l.name) # "\""
    # ",\"industry\":\"" # jsonEscape(l.industry) # "\""
    # ",\"city\":\"" # jsonEscape(l.city) # "\""
    # ",\"state\":\"" # jsonEscape(l.state) # "\""
    # ",\"phone\":\"" # jsonEscape(l.phone) # "\""
    # ",\"email\":\"" # jsonEscape(l.email) # "\""
    # ",\"notes\":\"" # jsonEscape(l.notes) # "\""
    # "}"
  };

  // ── Token allocation (stub — no tokens in $30 plan) ──────────────

  // Returns (0, 0) — the $30 Pro plan does not include AI tokens.
  // Retained so admin-affiliate.mo compiles without changes.
  public func allocateTokensForTier(_newTier : Text, _oldTier : Text) : (Nat, Nat) {
    (0, 0)
  };

};
