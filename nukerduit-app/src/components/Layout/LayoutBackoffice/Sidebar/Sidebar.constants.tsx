export type SidebarDataProps = {
  name: string;
  link?: string | null;
};

export const SidebarData : SidebarDataProps[] = [
  {
    name: "Home",
    link: "/admin/dashboard",
  },
  {
    name: "Buy Transaction",
    link: "/admin/buy-transaction",
  },
  {
    name: "Sell Transaction",
    link: "/admin/sell-transaction",
  },
  {
    name: "Summary",
    link: "/admin/summary",
  },
];
