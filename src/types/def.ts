export interface linkT {
  label: string;
  href: string;
}

export interface itemT {
  [key: string]: string;
}
export interface defaultSubHeaderT {
  type: "filter" | "navigation";
  open: boolean;
}

export interface SubHeaderT {
  navLinks: linkT[];
  type: string;
  setOpenNav: (e: defaultSubHeaderT) => void;
}

export interface InputSearchT {
  placeholder?: string;
  value: string;
  onChange: (e: string) => void;
}
