import { createFileRoute, Link } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("trabalhista");

export const Route = createFileRoute("/areas/trabalhista")({
  head: () => areaHead({ title: `Direito ${title}`, serviceName: "Advocacia Trabalhista em Londrina", serviceType: "Direito do Trabalho", description: intro, path: "/areas/trabalhista" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} extra={
    <p className="mt-8 text-base text-foreground/85">
      Leia também: <Link to="/acidente-de-trabalho" className="font-semibold text-navy underline hover:text-gold">Acidente de trabalho: quais são os direitos do trabalhador?</Link>
    </p>
  } />,
});
