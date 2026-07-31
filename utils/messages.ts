import type { HeroSlide, Industry } from "@/ui";

type HomeHeroSlide = HeroSlide & Required<Pick<HeroSlide, "heading" | "body" | "cta">>;

export type HomeMessages = {
  hero: {
    slides: HomeHeroSlide[];
  };
  industry: {
    eyebrow?: string;
    heading: string;
    body?: string;
    industries: Industry[];
  };
};

export async function getHomeMessages(): Promise<HomeMessages> {
  const messages = await import("@/messages/home.json");
  return messages.default;
}
