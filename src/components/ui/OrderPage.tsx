
import TypesProductHeader from "@/modules/product/TypesProductHeader";
import OrderForm from "./OrderForm";

export default function MainPage() {
  return (
    <div className="main-page order-page">
      <div className="product-items max-width">
        <div className="product-items-header">
          <h1>ОФОРМЛЕНИЕ ЗАКАЗА</h1>

          <TypesProductHeader type={"goBack"} />
        </div>
      </div>
      <div className="form-order max-width">
        <OrderForm />
      </div>
    </div>
  );
}
