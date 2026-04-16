"use client";

import { openCookiePreferences } from "@/lib/cookie-consent";

export default function CookiePreferencesButton() {
  return (
    <button type="button" onClick={openCookiePreferences} className="kappa-nav-link w-fit text-left">
      Preferenze cookie
    </button>
  );
}
