import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("contratos");

export const Route = createFileRoute("/areas/contratos")({
  head: () => areaHead({ title: title, serviceName: "Advocacia em Contratos em Londrina", serviceType: "Direito Contratual", description: intro, path: "/areas/contratos" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
