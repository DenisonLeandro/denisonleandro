import { createFileRoute } from "@tanstack/react-router";
import { AreaDetail } from "@/components/site/AreaDetail";
import { areaHead } from "@/lib/seo";
import { getArea } from "@/lib/site-content";

const { title, intro, items } = getArea("mediacao");

export const Route = createFileRoute("/areas/mediacao")({
  head: () => areaHead({ title: `${title} e Arbitragem`, serviceName: "Mediação e Arbitragem em Londrina", serviceType: "Mediação, Conciliação e Arbitragem", description: intro, path: "/areas/mediacao" }),
  component: () => <AreaDetail title={title} intro={intro} items={items} />,
});
