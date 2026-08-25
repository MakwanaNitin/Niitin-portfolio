// ─── Contact form metadata helpers ──────────────────────────────────────────
// Small, dependency-free helper used to timestamp a contact submission for
// the EmailJS template. Kept in its own module so Contact.jsx stays focused
// on form logic.

/** Human-readable local submission time, e.g. "1 July 2026, 4:12 PM". */
export function getFormattedDate() {
  try {
    return new Date().toLocaleString(undefined, {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  } catch {
    return new Date().toISOString();
  }
}
