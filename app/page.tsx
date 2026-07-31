import { Hero, IndustryHero } from "@/ui";
import { getHomeMessages } from "@/utils/messages";

export default async function Home() {
  const { hero, industry } = await getHomeMessages();

  return (
    <>
      <Hero slides={hero.slides} />
      <IndustryHero {...industry} />
    </>
  );
}
