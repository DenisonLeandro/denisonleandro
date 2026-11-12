import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("bancario");

export const Route = createFileRoute("/areas/bancario")({
  head: () => areaHead({ title: `Direito ${title}`, serviceName: "Advocacia Bancária em Londrina", serviceType: "Direito Bancário", description: intro, path: "/areas/bancario" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
