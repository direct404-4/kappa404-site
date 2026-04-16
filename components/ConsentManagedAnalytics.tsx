"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_UPDATED_EVENT, readCookieConsent } from "@/lib/cookie-consent";

export default function ConsentManagedAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setEnabled(readCookieConsent() === "accepted");
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, syncConsent as EventListener);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, syncConsent as EventListener);
    };
  }, []);

  return enabled ? (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  ) : null;
}
