import { StaticImageData } from "next/image";

export interface ButtonT {
  title: string;
  onClick?: () => void;
  style?: { [key: string]: string };
  disabled?: boolean;
  className?: string;
  iconLeft?: StaticImageData;
}
export interface InputT {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  errors?: { [key: string]: string };
  id: string;
  placeholder?: string;
  style?: { [key: string]: string };
}

export interface optionsT {
  label: string;
  value: string;
}

export interface SelectT {
  id: string;
  title: string;
  options: optionsT[];
  errors?: { [key: string]: string };
  valueDef?: string;
  onChange: (value: optionsT) => void;
}

export interface InputSearchT {
  onChange: (value: string) => void;
  value: string;
}
export interface InputFileT {
  value: File | string | null;
  onChange: (files: File) => void;
  id: string;
}

export interface roleItemsT {
  key: number;
  name: string;
}
