import { defDataT, sizeT } from "./product";

export interface SizesProductT {
  sizes: defDataT[];
  value?: sizeT;
  onChange: (size: sizeT) => void;
}
