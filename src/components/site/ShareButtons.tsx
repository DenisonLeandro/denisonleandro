import { Facebook, Linkedin, MessageCircle } from "lucide-react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: Facebook },
  ];
  return (
    <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-6">
      <span className="text-sm text-muted-foreground">Compartilhar:</span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:border-gold hover:text-gold"
        >
          <Icon size={14} />
          {label}
        </a>
      ))}
    </div>
  );
}
