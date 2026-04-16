"use client";
import React, { useEffect, useState } from "react";
import Input from "../element/Input";
import { useFormStore } from "@/hooks/useFormStore";
import Textarea from "../element/Textarea";
import BasketItems from "@/modules/basket/BasketItems";
import { useGlobalState } from "@/store/globalState";
import { PostOrderREQ } from "@/api/product/order";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import { useRouter } from "next/navigation";

const OrderPrice = 20;

export default function OrderForm() {
  const { basketItems, setBasketItems } = useGlobalState();
  const [price, setPrice] = useState(0);
  const [skitka, setSkitka] = useState(0);
  const [count, setCount] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState<string | number>("");
  const { data, errors, setData, validate, setClear } = useFormStore();
  const router = useRouter();

  useEffect(() => {
    let count = 0;
    basketItems.forEach((e) => {
      count += e.count;
    });
    setCount(count);
  }, [basketItems]);

  const onSend = async () => {
    const isValid = validate({
      name: { required: true },
      surname: { required: true },
      phone: {
        required: true,
        message: "Неверный номер телефона",
        minLength: 9,
      },
    });

    if (!isValid) return;
    try {
      const res = await PostOrderREQ({
        data: {
          ...data,
          surname: data.name + " " + data.surname,
          street:
            data.street +
            ", " +
            data.floor +
            ", " +
            data.index +
            ", " +
            data.entrance,
          products: basketItems.map((e) => ({
            ...e,
            productId: e.id,
            sizeId: e.size.id,
          })),
        },
      });
      if (res) {
        setShowSuccessModal(true);
        setBasketItems([]);
        localStorage.removeItem("basketIds");
      }
    } catch (e: any) {
      console.error(e);
      setErrorCode(e.response?.status || e.message || "Unknown");
      setShowErrorModal(true);
    }
  };
  return (
    <div className="form-order-main">
      <div className="left-com">
        <main>
          <h1>Получатель</h1>
          <div>
            <Input
              title="Имя"
              value={data?.name as string}
              onChange={(value) => setData("name", value)}
              errors={errors}
              id="name"
              placeholder="Имя"
            />
            <Input
              title="Фамилия"
              value={data?.surname as string}
              onChange={(value) => setData("surname", value)}
              errors={errors}
              id="surname"
              placeholder="Фамилия"
            />
            <Input
              title="Телефон"
              value={data?.phone as string}
              onChange={(value) => setData("phone", value)}
              errors={errors}
              id="phone"
              type="phone"
              placeholder="Телефон"
            />
            <Input
              title="Email (необязательно)"
              value={data?.email as string}
              onChange={(value) => setData("email", value)}
              errors={errors}
              id="email"
              type="email"
              placeholder="Email (необязательно)"
            />
          </div>
        </main>
        <main>
          <h1>Доставка</h1>
          <div>
            <nav>
              <Input
                title="Город"
                value={data?.city as string}
                onChange={(value) => setData("city", value)}
                errors={errors}
                id="city"
                placeholder="Город"
              />
              <Input
                title="Улица, дом"
                value={data?.street as string}
                onChange={(value) => setData("street", value)}
                errors={errors}
                id="street"
                placeholder="Улица, дом"
              />
            </nav>
            <Input
              title="Подъезд"
              value={data?.entrance as string}
              onChange={(value) => setData("entrance", value)}
              errors={errors}
              id="entrance"
              placeholder="Подъезд"
            />
            <Input
              title="Этаж"
              value={data?.floor as string}
              onChange={(value) => setData("floor", value)}
              errors={errors}
              id="floor"
              placeholder="Этаж"
            />
            <Input
              title="Квартира"
              value={data?.index as string}
              onChange={(value) => setData("index", value)}
              errors={errors}
              id="index"
              placeholder="Квартира"
            />
            <Input
              title="Код домофона (необязательно)"
              value={data?.code as string}
              onChange={(value) => setData("code", value)}
              errors={errors}
              id="code"
              placeholder="Код домофона (необязательно)"
            />
          </div>
        </main>
        <main>
          <h1>Дополнительно</h1>
          <div>
            <nav>
              <Textarea
                title="Комментарий"
                value={data?.comment as string}
                onChange={(value) => setData("comment", value)}
                errors={errors}
                id="comment"
                placeholder="Комментарий"
              />
            </nav>
          </div>
        </main>
        <main>
          <h1>Сумма заказа</h1>
          <div>
            <nav>
              <footer>
                <div>
                  <label>
                    <span>{count} товара на сумму</span> <span>{price}</span>
                  </label>
                  <label>
                    <span>Доставка</span> <span>{OrderPrice}c</span>
                  </label>
                  <label className="skid">
                    <span>Скидка</span> <span>{skitka}c</span>
                  </label>
                </div>
              </footer>
            </nav>
          </div>
          <hr />
          <div>
            <nav>
              <h1>
                <span>Итого</span>{" "}
                <span>
                  {price + OrderPrice} с.{}
                </span>
              </h1>
            </nav>
          </div>
          <div>
            <nav>
              <button onClick={onSend}>Оформить заказ</button>
            </nav>
          </div>
        </main>
      </div>
      <div className="right-com">
        <main>
          <h1>Состав заказа</h1>
          <nav>
            <BasketItems
              totalPrice={price}
              setTotalPrice={setPrice}
              order={true}
              open={true}
              onClose={() => {}}
              setSkitka={setSkitka}
            />
          </nav>
        </main>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setClear();
          router.push("/");
        }}
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorCode={errorCode}
      />
    </div>
  );
}
