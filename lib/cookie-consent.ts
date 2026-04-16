export type CookieConsentChoice = "accepted" | "rejected";

export const COOKIE_CONSENT_STORAGE_KEY = "kappa404_cookie_consent_v1";
export const COOKIE_CONSENT_UPDATED_EVENT = "kappa404:cookie-consent-updated";
export const COOKIE_CONSENT_OPEN_EVENT = "kappa404:cookie-consent-open";

export function readCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function writeCookieConsent(value: CookieConsentChoice) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT, { detail: value }));
}

export function openCookiePreferences() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}
