import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("previdenciario");

export const Route = createFileRoute("/areas/previdenciario")({
  head: () => areaHead({ title: `Direito ${title}`, serviceName: "Advocacia Previdenciária em Londrina", serviceType: "Direito Previdenciário", description: intro, path: "/areas/previdenciario" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
