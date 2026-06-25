// Central SEO helpers. Use buildHead in every public route to keep
// title, description, og:*, twitter:* and canonical consistent.

export const SITE_URL = "https://denisonleandro.adv.br";
export const SITE_NAME = "Denison Leandro Advogados Associados";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export interface BuildHeadInput {
  /** Page-specific title (without the site-name suffix). */
  title: string;
  /** Meta description, ~150 chars. */
  description: string;
  /** Absolute path (e.g. "/contato"). Defaults to "/". */
  path?: string;
  /** Absolute URL of the share image. Defaults to DEFAULT_OG_IMAGE. */
  image?: string;
  /** OpenGraph type. "website" by default; "article" for posts. */
  type?: "website" | "article";
  /** Optional explicit full title (skips the " | SITE_NAME" suffix). */
  fullTitle?: string;
  /** When true, emits robots noindex,nofollow (for /auth, /admin). */
  noindex?: boolean;
}

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

interface HeadResult {
  meta: MetaTag[];
  links: Array<{ rel: string; href: string }>;
}

export function buildHead(input: BuildHeadInput): HeadResult {
  const {
    title,
    description,
    path = "/",
    image = DEFAULT_OG_IMAGE,
    type = "website",
    fullTitle,
    noindex = false,
  } = input;

  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const titleText = fullTitle ?? `${title} | ${SITE_NAME}`;

  const meta: MetaTag[] = [
    { title: titleText },
    { name: "description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:type", content: type },
    { property: "og:title", content: titleText },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titleText },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }

  return {
    meta,
    links: noindex ? [] : [{ rel: "canonical", href: url }],
  };
}
