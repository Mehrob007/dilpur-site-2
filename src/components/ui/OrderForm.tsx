"use client";
import React, { useEffect, useState } from "react";
import Input from "../element/Input";
import { useFormStore } from "@/hooks/useFormStore";
import Textarea from "../element/Textarea";
import BasketItems from "@/modules/basket/BasketItems";
import { redirect } from "next/navigation";
import { useGlobalState } from "@/store/globalState";

export default function OrderForm() {
  const { basketItems, setBasketItems } = useGlobalState();
  const [price, setPrice] = useState(0);
  const { data, errors, setData } = useFormStore();

  useEffect(() => {
    // if (basketItems?.[0]) {
    //   redirect("/");
    // }
  }, []);

  console.log("basketItems", basketItems);

  return (
    <div className="form-order-main">
      <div className="left-com">
        <main>
          <h1>Получатель</h1>
          <div>
            <Input
              title="Имя"
              value={data?.Name as string}
              onChange={(value) => setData("Name", value)}
              errors={errors}
              id="Name"
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
              placeholder="Телефон"
            />
            <Input
              title="Email (необязательно)"
              value={data?.email as string}
              onChange={(value) => setData("email", value)}
              errors={errors}
              id="email"
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
              value={data?.pod as string}
              onChange={(value) => setData("pod", value)}
              errors={errors}
              id="pod"
              placeholder="Подъезд"
            />
            <Input
              title="Этаж"
              value={data?.etaj as string}
              onChange={(value) => setData("etaj", value)}
              errors={errors}
              id="etaj"
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
              value={data?.code_home as string}
              onChange={(value) => setData("code_home", value)}
              errors={errors}
              id="code_home"
              placeholder="Код домофона (необязательно)"
            />
          </div>
        </main>
        <main>
          <h1>Доставка</h1>
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
                    <span>4 товара на сумму</span> <span>{price}</span>
                  </label>
                  <label>
                    <span>Доставка</span> <span>20c</span>
                  </label>
                  <label className="skid">
                    <span>Скидка</span> <span>400c</span>
                  </label>
                </div>
              </footer>
            </nav>
          </div>
          <hr />
          <div>
            <nav>
              <h1>
                <span>Итого</span> <span>14 020 с.{}</span>
              </h1>
            </nav>
          </div>
          <div>
            <nav>
              <button>Оформить заказ</button>
            </nav>
          </div>
        </main>
      </div>
      <div className="right-com">
        <main>
          <h1>Состав заказа</h1>
          <nav>
            {/* <BasketItems open={true} onClose={() => {}} /> */}
          </nav>
        </main>
      </div>
    </div>
  );
}
