import { useEffect } from "react";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: string;
}

function setMeta(name: string, content: string, attribute = "name"): void {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${name}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string): () => void {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return () => {
    if (created && el) {
      el.remove();
    }
  };
}

const JSON_LD_ID = "tele-blast-page-jsonld";

function injectJsonLd(schema: string): () => void {
  removeJsonLd();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = JSON_LD_ID;
  script.textContent = schema;
  document.head.appendChild(script);
  return removeJsonLd;
}

function removeJsonLd(): void {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
}

/**
 * useSEO — inject page-level SEO meta tags, Open Graph, Twitter Card,
 * canonical link, and JSON-LD into document.head. Cleans up on unmount.
 */
export function useSEO({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = "website",
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd,
}: SEOProps): void {
  useEffect(() => {
    const prevTitle = document.title;

    // Page title
    if (title) {
      document.title = title;
    }

    // Standard meta
    if (description) setMeta("description", description);
    if (robots) setMeta("robots", robots);

    // Open Graph
    if (ogTitle ?? title) setMeta("og:title", (ogTitle ?? title)!, "property");
    if (ogDescription ?? description)
      setMeta("og:description", (ogDescription ?? description)!, "property");
    if (ogUrl ?? canonical)
      setMeta("og:url", (ogUrl ?? canonical)!, "property");
    if (ogType) setMeta("og:type", ogType, "property");
    // Always set og:image — use provided value or fall back to the platform icon
    setMeta(
      "og:image",
      ogImage ?? "https://www.tele-blast.com/icons/icon-512.svg",
      "property",
    );

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    if (twitterTitle ?? ogTitle ?? title)
      setMeta("twitter:title", (twitterTitle ?? ogTitle ?? title)!);
    if (twitterDescription ?? ogDescription ?? description)
      setMeta(
        "twitter:description",
        (twitterDescription ?? ogDescription ?? description)!,
      );
    if (twitterImage ?? ogImage)
      setMeta("twitter:image", (twitterImage ?? ogImage)!);

    // Canonical link
    const removeCanonical = canonical ? setLink("canonical", canonical) : null;

    // JSON-LD structured data
    const removeSchema = jsonLd ? injectJsonLd(jsonLd) : null;

    return () => {
      document.title = prevTitle;
      removeCanonical?.();
      removeSchema?.();
    };
  }, [
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    jsonLd,
  ]);
}
