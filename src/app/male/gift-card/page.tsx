"use client";
import Image from "next/image";
import giftCord2 from "../../../../public/images/giftCord2.svg";
import React from "react";
import arrow from "../../../../public/icons/arrow.svg";
import PartnerStores from "@/components/ui/PartnerStores";
import Select from "@/components/element/Select";
import { options, optionsNaminal } from "@/constants/select";
import { useFormStore } from "@/hooks/useFormStore";
import apiClient from "@/utils/apiClient";

export default function Page() {
  const { data, errors, setData, validate } = useFormStore();

  const onSend = async () => {
    const isValid = validate({
      main_title: { required: true },
      main_photo_id: { required: true },
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
              placeholder="Выберите магазин"
              onChange={(e) => setData("key", e)}
              options={options}
              error={errors}
              style={{ zIndex: "5" }}
            />
            <Select
              placeholder="Номинал"
              onChange={(e) => setData("key", e)}
              options={optionsNaminal}
              error={errors}
            />
            <button className="button">
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
