
export const ICONS = {
  food: "/icon_food.svg",
  shopping: "/icon_shopping.svg",
  chair: "/icon_chair.svg",
  chevronDown: "/icon_chevron_down.svg",
  arrowRight: "/icon_arrow_right.svg",
  hamburger: "/icon_hamberger.svg",
  close: "/icon_close.svg",
} as const;

export type IconName = keyof typeof ICONS;
