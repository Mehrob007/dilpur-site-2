"use client";
import Image from "next/image";
import giftCord2 from "../../../../public/images/giftCord2.svg";
import React, { useEffect, useState } from "react";
import arrow from "../../../../public/icons/arrow.svg";
import PartnerStores from "@/components/ui/PartnerStores";
import Select from "@/components/element/Select";
import { optionsNaminal } from "@/constants/select";
import { useFormStore } from "@/hooks/useFormStore";
import apiClient from "@/utils/apiClient";
import { GetShopREQ } from "@/api/shop/shop";
import { shopT } from "@/types/shop";

export default function Page() {
  const { data, errors, setData, validate } = useFormStore();
  const [shops, setShops] = useState<shopT[]>([]);

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
        await apiClient.post("/cadets/add", data).then(() => {});
      } catch (e) {
        console.error("Error sending data:", e);
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
