"use client";
import Image from "next/image";
import giftCord2 from "../../../../public/images/giftCord2.svg";
import React, { useEffect, useState } from "react";
import arrow from "../../../../public/icons/arrow.svg";
import PartnerStores from "@/components/ui/PartnerStores";
import Select from "@/components/element/Select";
import { optionsNaminal } from "@/constants/select";
import { useFormStore } from "@/hooks/useFormStore";
import { GetShopREQ } from "@/api/shop/shop";
import { shopT } from "@/types/shop";
import { useGlobalState } from "@/store/globalState";

export default function Page() {
  const { data, errors, setData, validate } = useFormStore();
  const [shops, setShops] = useState<shopT[]>([]);
  const { setBasketItems } = useGlobalState();

  const getShops = async () => {
    try {
      const res = await GetShopREQ();
      setShops(res?.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  const onSend = async () => {
    const isValid = validate({
      shop: { required: true },
      nominal: { required: true },
    });
    if (isValid) {
      try {
        const nominalMap: Record<string, number> = {
          "1": 1000,
          "2": 3000,
          "3": 5000,
        };

        const cost = nominalMap[data.nominal as string] || 0;
        const selectedShop = shops.find((s) => String(s.id) === String(data.shop));
        const shopName = selectedShop ? selectedShop.name : "Магазин";

        const giftCardItem = {
          id: Date.now(),
          size: { id: 0, name: "GIFT" },
          count: 1,
          cost: cost,
          isGiftCard: true,
          nominal:
            optionsNaminal.find((o) => o.value === data.nominal)?.label ||
            `${cost} сомони`,
          shopName: shopName,
        };

        const basketIds = JSON.parse(localStorage.getItem("basketIds") || "[]");
        const newBasket = [...basketIds, giftCardItem];

        localStorage.setItem("basketIds", JSON.stringify(newBasket));
        setBasketItems(newBasket);

        alert("Подарочная карта добавлена в корзину");
      } catch (e) {
        console.error("Error adding gift card:", e);
      }
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <div className="gift-card-page">
      <div className="gift-card-main max-width">
        <div className="gift-card-main-header">
          <h1>подарочная карта</h1>
          <p>
            Оформите карту на сайте и получите стильную пластиковую карту уже
            через пару часов{" "}
          </p>
        </div>
        <div className="gift-card-main-content">
          <Image src={giftCord2} alt="img-gift-card" width={500} height={300} />
          <div>
            <Select
              id="shop-gift-card"
              placeholder="Выберите магазин"
              onChange={(e) => setData("shop", e)}
              options={shops.map((e) => ({
                label: e.name,
                value: String(e.id),
              }))}
              error={errors}
              style={{ zIndex: "5" }}
            />
            <Select
              id="price-gift-card"
              placeholder="Номинал"
              onChange={(e) => setData("nominal", e)}
              options={optionsNaminal}
              error={errors}
            />
            <button className="button" onClick={onSend}>
              <span>
                Оформить карту{" "}
                <Image src={arrow} alt="arrow" width={15} height={12} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <PartnerStores />
    </div>
  );
}
