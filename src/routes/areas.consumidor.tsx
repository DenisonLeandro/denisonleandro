import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("consumidor");

export const Route = createFileRoute("/areas/consumidor")({
  head: () => areaHead({ title: `Direito do ${title}`, serviceName: "Advocacia do Consumidor em Londrina", serviceType: "Direito do Consumidor", description: intro, path: "/areas/consumidor" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
