// import { sizeT } from "./product";

import { sizeT } from "./product";

export interface ButtonAddProductT {
  id: number;
  onClick: () => void;
  shop?: sizeT;
}
