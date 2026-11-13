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
  type?: "website" | "article" | "profile";
  /** Optional explicit full title (skips the " | SITE_NAME" suffix). */
  fullTitle?: string;
  /** When true, emits robots noindex,nofollow (for /auth, /admin). */
  noindex?: boolean;
  /** ISO dates for article:published_time / article:modified_time. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /** Alt text for the share image. */
  imageAlt?: string;
  /** Pixel size of the share image (defaults to 1200x630 for the default image). */
  imageWidth?: number;
  imageHeight?: number;
  /** article:section */
  section?: string;
  /** JSON-LD objects to render server-side for this page. */
  jsonLd?: unknown[];
}

type MetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

interface HeadResult {
  meta: MetaTag[];
  links: Array<{ rel: string; href: string }>;
  scripts?: Array<{ type: string; children: string }>;
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
    { property: "og:image:alt", content: input.imageAlt ?? titleText },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: titleText },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (input.publishedTime)
    meta.push({ property: "article:published_time", content: input.publishedTime });
  if (input.modifiedTime)
    meta.push({ property: "article:modified_time", content: input.modifiedTime });
  if (input.author) meta.push({ property: "article:author", content: input.author });
  if (input.section) meta.push({ property: "article:section", content: input.section });
  const w = input.imageWidth ?? (image === DEFAULT_OG_IMAGE ? 1200 : undefined);
  const h = input.imageHeight ?? (image === DEFAULT_OG_IMAGE ? 630 : undefined);
  if (w && h) {
    meta.push({ property: "og:image:width", content: String(w) });
    meta.push({ property: "og:image:height", content: String(h) });
  }

  if (noindex) {
    meta.push({ name: "robots", content: "noindex,nofollow" });
  }

  return {
    meta,
    links: noindex ? [] : [{ rel: "canonical", href: url }],
    ...(input.jsonLd?.length
      ? { scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": input.jsonLd }) }] }
      : {}),
  };
}

// ---------- Structured data (JSON-LD) ----------
export const ORG_ID = `${SITE_URL}/#escritorio`;
export const SITE_ID = `${SITE_URL}/#site`;
export const FOUNDER_ID = `${SITE_URL}/equipe/denison-henrique-leandro#pessoa`;
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/denisonleandro.adv",
  facebook: "https://www.facebook.com/denisonleandro.adv",
  youtube: "https://www.youtube.com/@denisonleandroeadvogadosas487",
};
export const MAP_URL = "https://maps.app.goo.gl/MrZD48gQzX4YbJMk9";

export const absUrl = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u.startsWith("/") ? u : `/${u}`}`);

export function orgGraph(logoUrl: string) {
  return [
    {
      "@type": "LegalService",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: "Denison Leandro Advogados",
      url: SITE_URL,
      logo: absUrl(logoUrl),
      image: DEFAULT_OG_IMAGE,
      description:
        "Escritório de advocacia em Londrina-PR, fundado em 2000, com atuação em Direito Trabalhista, Previdenciário, da Saúde, do Consumidor, Bancário, de Família e Contratos. Atendimento online em todo o Brasil.",
      telephone: "+55-43-3322-8455",
      email: "contato@denisonleandro.adv.br",
      foundingDate: "2000",
      founder: { "@id": FOUNDER_ID },
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Paraná, 343, 9º andar, sala 902 - Ed. Satélite",
        addressLocality: "Londrina",
        addressRegion: "PR",
        postalCode: "86010-920",
        addressCountry: "BR",
      },
      hasMap: MAP_URL,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-43-99994-8455",
        contactType: "customer service",
        availableLanguage: "pt-BR",
        description: "WhatsApp",
      },
      areaServed: [
        { "@type": "City", name: "Londrina" },
        { "@type": "State", name: "Paraná" },
        { "@type": "Country", name: "Brasil" },
      ],
      knowsAbout: ["Direito do Trabalho", "Direito Previdenciário", "Direito do Consumidor", "Direito de Família", "Contratos", "Direito Bancário", "Direito da Saúde", "Plano de Saúde", "Direito Médico"],
      sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.youtube, MAP_URL],
    },
    { "@type": "WebSite", "@id": SITE_ID, name: SITE_NAME, url: SITE_URL, inLanguage: "pt-BR", publisher: { "@id": ORG_ID } },
  ];
}

export interface PersonInput {
  slug: string;
  name: string;
  jobTitle: string;
  email?: string;
  photo?: string | null;
  oab?: string;
  knowsAbout?: string[];
  credentials?: string[];
  alumniOf?: string[];
  sameAs?: string[];
}

export const personId = (slug: string) => `${SITE_URL}/equipe/${slug}#pessoa`;

export function personSchema(p: PersonInput) {
  const oabNumber = p.oab?.replace(/^OAB\/PR\s*/i, "");
  return {
    "@type": "Person",
    "@id": personId(p.slug),
    name: p.name,
    jobTitle: p.jobTitle,
    url: `${SITE_URL}/equipe/${p.slug}`,
    ...(p.photo ? { image: absUrl(p.photo) } : {}),
    ...(p.email ? { email: p.email } : {}),
    ...(oabNumber ? { identifier: { "@type": "PropertyValue", propertyID: "OAB/PR", value: oabNumber } } : {}),
    worksFor: { "@id": ORG_ID },
    ...(p.knowsAbout?.length ? { knowsAbout: p.knowsAbout } : {}),
    ...(p.credentials?.length
      ? { hasCredential: p.credentials.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) }
      : {}),
    ...(p.alumniOf?.length ? { alumniOf: p.alumniOf.map((n) => ({ "@type": "EducationalOrganization", name: n })) } : {}),
    ...(p.sameAs?.length ? { sameAs: p.sameAs } : {}),
  };
}

/** Full head for a team member page (profile type, photo as share image, Person JSON-LD). */
export function personHead(p: PersonInput & { description: string; shareImage?: { url: string; width: number; height: number } }) {
  return buildHead({
    title: p.name,
    description: p.description,
    path: `/equipe/${p.slug}`,
    type: "profile",
    ...(p.shareImage
      ? { image: absUrl(p.shareImage.url), imageAlt: `Foto de ${p.name}`, imageWidth: p.shareImage.width, imageHeight: p.shareImage.height }
      : p.photo ? { image: absUrl(p.photo), imageAlt: `Foto de ${p.name}` } : {}),
    jsonLd: [
      personSchema(p),
      breadcrumb([
        ["Início", "/"],
        ["Profissionais", "/profissionais"],
        [p.name, `/equipe/${p.slug}`],
      ]),
    ],
  });
}

export function breadcrumb(items: Array<[string, string]>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE_URL}${path}` })),
  };
}

/** Head for a practice-area page with Service + BreadcrumbList JSON-LD. */
export function areaHead(opts: { title: string; serviceName: string; serviceType: string; description: string; path: string }) {
  return buildHead({
    title: opts.title,
    description: opts.description,
    path: opts.path,
    jsonLd: [
      {
        "@type": "Service",
        name: opts.serviceName,
        serviceType: opts.serviceType,
        description: opts.description,
        url: `${SITE_URL}${opts.path}`,
        areaServed: [
          { "@type": "City", name: "Londrina" },
          { "@type": "State", name: "Paraná" },
        ],
        provider: { "@id": ORG_ID },
      },
      breadcrumb([
        ["Início", "/"],
        ["Áreas de Atuação", "/areas-de-atuacao"],
        [opts.title, opts.path],
      ]),
    ],
  });
}
