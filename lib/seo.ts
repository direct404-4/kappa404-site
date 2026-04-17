import type { Metadata } from "next";
import type { Project, Service } from "@/lib/content";

export const SITE_URL = "https://www.kappa404.it";
export const SITE_NAME = "Kappa404";
export const SITE_TITLE = "Kappa404 — AI Visual Engineering";
export const SITE_DESCRIPTION =
  "Kappa404 realizza sistemi digitali premium: web development, AI automation, software custom e direzione visuale ad alte prestazioni.";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Kappa404 - AI Visual Engineering"
} as const;

export type FaqItem = {
  question: string;
  answer: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  image?: typeof DEFAULT_OG_IMAGE;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function brandedTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = DEFAULT_OG_IMAGE
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogTitle = brandedTitle(title);
  const ogImage = {
    ...image,
    url: absoluteUrl(image.url)
  };

  return {
    title,
    description,
    alternates: {
      canonical
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true
          }
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "it_IT",
      type: "website",
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage.url]
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/icon-512.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    description: SITE_DESCRIPTION,
    areaServed: ["Italia", "Milano", "Europa"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Milano",
      addressCountry: "IT"
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+39 352 000 7587",
        availableLanguage: ["it", "en"],
        url: absoluteUrl("/contatti")
      }
    ],
    sameAs: ["https://www.instagram.com/kappa404_/", "https://www.tiktok.com/@amk404_"]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "it-IT",
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    description: SITE_DESCRIPTION
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function servicesItemListJsonLd(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servizi Kappa404",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.nome,
        description: service.descrizione,
        url: absoluteUrl(`/servizi/${service.slug}`),
        provider: {
          "@id": `${SITE_URL}/#organization`
        }
      }
    }))
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/servizi/${service.slug}#service`),
    name: service.nome,
    serviceType: service.nome,
    description: service.descrizione,
    url: absoluteUrl(`/servizi/${service.slug}`),
    provider: {
      "@id": `${SITE_URL}/#organization`
    },
    areaServed: ["Italia", "Milano", "Europa"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/contatti")
    }
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": absoluteUrl(`/progetti/${project.slug}#project`),
    name: project.title,
    description: project.descrizione,
    url: absoluteUrl(`/progetti/${project.slug}`),
    image: project.image ? absoluteUrl(project.image) : absoluteUrl(DEFAULT_OG_IMAGE.url),
    creator: {
      "@id": `${SITE_URL}/#organization`
    },
    about: project.categoria,
    workExample: project.liveUrl
  };
}
