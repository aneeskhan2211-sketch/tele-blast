module {
  /// Stores a reference to a voicemail recording uploaded via object-storage.
  /// Raw audio bytes are NEVER stored here — only the URL and metadata.
  public type VoicemailPreference = {
    recordingUrl  : Text;
    recordingName : Text;
    savedAt       : Int;
  };
};
