import JsonLd from "@/components/JsonLd";
import TerminalExperience from "@/components/TerminalExperience";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Soluzioni AI",
  description:
    "Terminale interattivo Kappa404 per mappare identita, colli di bottiglia e obiettivi prima di progettare automazioni AI e sistemi digitali.",
  path: "/soluzioni-ai"
});

export default function SoluzioniAiPage() {
  return (
    <>
      <JsonLd
        id="kappa404-soluzioni-ai-breadcrumb"
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Soluzioni AI", path: "/soluzioni-ai" }
        ])}
      />
      <TerminalExperience />
    </>
  );
}
