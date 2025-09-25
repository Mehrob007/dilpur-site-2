"use client";
import Description from "@/components/element/Description";
import HiddenDescription from "@/components/element/HiddenDescription";
import ButtonAddProduct from "@/components/ui/ButtonAddProduct";
import ColorProduct from "@/components/ui/ColorProduct";
import PartnerStores from "@/components/ui/PartnerStores";
import ProductDetails from "@/components/ui/ProductDetails";
import SizesProduct from "@/components/ui/SizeProduct";
import { ArrDefData, sizes } from "@/constants/product";
import ProductItems from "@/modules/product/ProductItems";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Product() {
  const { idProduct } = useParams();

  const {
    id,
    img,
    title,
    subTitle,
    price,
    discount,
    article,
    details,
    property,
    colors,
  } = ArrDefData[0];
  return (
    <div className="product-page">
      <main className="max-width">
        <div className="product-page-images">
          {img &&
            img.map((e, i) => (
              <Image
                src={e}
                key={i}
                alt={`product-img-${i}`}
                width={372}
                height={560}
              />
            ))}
        </div>
        <div className="product-page-details">
          <ProductDetails details={details} />
          <div className="product-page-header">
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <p>Артикул {article}</p>
          </div>
          <div className="product-item-price">
            {discount ? (
              <>
                <div className="discount">{discount} c.</div>{" "}
                <div className="crossed">{price} c.</div>
              </>
            ) : (
              <div className="price">{price} c.</div>
            )}
          </div>
          {colors && <ColorProduct colors={colors} />}
          <SizesProduct sizes={sizes} onChange={(e) => console.log(e)} />
          {id && <ButtonAddProduct id={id} />}
          <Description
            title="Описание"
            description={`Стильный пиджак Lord Maul песочного \n
оттенка из натурального льна и хлопка`}
          />
          <Description
            title="Состав"
            description={`Лён — 70%\n
Хлопок — 30%\n
Вискоза — 100%\n
Полиэстер (нити строчки) — 5%`}
          />
          <HiddenDescription
            title="Доставка и возврат"
            description={`В Душанбе доставка занимает от нескольких часов, по \n Таджикистану — от нескольких дней.  Вы можете вернуть \n товар, лично посетив наш магазин, предварительно \n согласовав возврат  с нами по телефону. \n \n
Для уточнения деталей обращайтесь к нашим менеджерам`}
          />
        </div>
      </main>
      <ProductItems
        title={"Похожие товары"}
        limit={3}
        type={null}
        getURl={""}
      />
      <PartnerStores />
    </div>
  );
}
