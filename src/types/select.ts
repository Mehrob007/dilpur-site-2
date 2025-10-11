export interface options {
  value: string;
  label: string;
}

// export interface selectedOptionsTypestring[]
export interface SelectT {
  id: string,
  options: options[];
  placeholder: string;
  checkBox?: boolean
  className?: string;
  onChange?: (value: string) => void;
  error?: { [key: string]: string };
  style?: { [key: string]: string };
  toggle?: boolean
}
