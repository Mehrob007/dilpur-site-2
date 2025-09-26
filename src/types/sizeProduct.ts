import { sizeT } from "./product";

export interface SizesProductT {
  sizes: sizeT[];
  value?: sizeT;
  onChange: (size: sizeT) => void;
}
