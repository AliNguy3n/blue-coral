export type PanelLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  panel?: PanelLink[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Giải pháp",
    href: "/giai-phap",
    panel: [
      { label: "Lorem ipsum dolor", href: "/giai-phap/pos" },
      { label: "Sed do eiusmod tempor", href: "/giai-phap/qr-order" },
      { label: "Lorem ipsum dolor", href: "/giai-phap/kitchen" },
      { label: "Sed do eiusmod tempor", href: "/giai-phap/loyalty" },
    ],
  },
  { label: "Thiết bị", href: "/thiet-bi" },
  { label: "Bảng giá", href: "/bang-gia" },
  { label: "Hỗ trợ", href: "/ho-tro" },
];

export const AUTH_ACTIONS = {
  login: { label: "Đăng nhập", href: "/dang-nhap" },
  signup: { label: "Sử dụng miễn phí", href: "/dang-ky" },
} as const;
