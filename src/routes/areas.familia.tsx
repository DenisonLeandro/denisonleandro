import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("familia");

export const Route = createFileRoute("/areas/familia")({
  head: () => areaHead({ title: `Direito de ${title} e Sucessões`, serviceName: "Advocacia de Família e Sucessões em Londrina", serviceType: "Direito de Família e Sucessões", description: intro, path: "/areas/familia" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
