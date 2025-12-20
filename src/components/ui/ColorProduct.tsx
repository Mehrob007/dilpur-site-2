import { ColorProductT } from "@/types/colorProduct";
import ColorProductItem from "./ColorProductItem";

export default function ColorProduct({ colorsIds }: ColorProductT) {
  return (
    <div className="details-product">
      <h1>Другие цвета</h1>
      <div>
        {colorsIds?.map((e, i) => (
          <ColorProductItem key={i} id={e} index={i} />
        ))}
      </div>
    </div>
  );
}
