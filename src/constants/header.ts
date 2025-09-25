import { defaultSubHeaderT, linkT } from "@/types/def";

export const navLinks: linkT[] = [
  { label: "Каталог", href: "/catalog" },
  { label: "Одежда", href: "#clothing" },
  { label: "Обувь", href: "#footwear" },
  { label: "Аксессуары", href: "#accessories" },
  { label: "Подарочные карты", href: "#gift-cards" },
  { label: "О нас", href: "/about-us" },
  { label: "Вакансии", href: "/vacancies" },
  { label: "Акции", href: "#promotions" },
];

export const links: linkT[] = [
  { label: "Мужчины", href: "/male" },
  { label: "Женщины", href: "/female" },
];

export const forBuyers: linkT[] = [
  { label: "Доставка и оплата", href: "/" },
  { label: "Возврат", href: "/" },
  { label: "Политика конфиденциальности", href: "/" },
];

export const popularQueries = [
  { label: "Пиджак", value: "1" },
  { label: "Брюки", value: "2" },
  { label: "Рубашка Lord Maul", value: "3" },
];

export const defaultSubHeader: defaultSubHeaderT  = { type: "navigation", open: false }