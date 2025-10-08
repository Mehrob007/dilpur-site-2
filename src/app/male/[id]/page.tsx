"use client";
import { GetProductByIdREQ } from "@/api/product/product";
import Description from "@/components/element/Description";
import HiddenDescription from "@/components/element/HiddenDescription";
import ButtonAddProduct from "@/components/ui/ButtonAddProduct";
import ColorProduct from "@/components/ui/ColorProduct";
import PartnerStores from "@/components/ui/PartnerStores";
import ProductDetails from "@/components/ui/ProductDetails";
import SizesProduct from "@/components/ui/SizeProduct";
import ProductItems from "@/modules/product/ProductItems";
import { useGlobalState } from "@/store/globalState";
import { defDataT, ProductItemT, sizeT } from "@/types/product";
import { getFileURL } from "@/utils/getFileURL";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState<ProductItemT | null>(null);
  const [sizes, setSizes] = useState<defDataT[] | null>(null);
  const [selectSize, setSelectSize] = useState<sizeT>();
  const { setBasketItems, basketItems } = useGlobalState();

  const addProdductToBasket = ({ id, size }: { id: number; size: sizeT }) => {
    const basketIds: {
      id: number;
      size: sizeT;
      count: number;
    }[] = JSON.parse(localStorage.getItem("basketIds") || "[]");
    if (basketIds?.find((e) => e.id === id)) {
      localStorage.setItem(
        "basketIds",
        JSON.stringify(
          basketIds.map((e) => {
            if (e.id === id) {
              return { ...e, count: e.count + 1 };
            } else {
              return e;
            }
          })
        )
      );
      setBasketItems(
        basketIds.map((e) => {
          if (e.id === id) {
            return { ...e, count: e.count + 1 };
          } else {
            return e;
          }
        })
      );
    } else {
      localStorage.setItem(
        "basketIds",
        JSON.stringify([...basketIds, { id, size, count: 1 }])
      );
      setBasketItems([...basketIds, { id, size, count: 1 }]);
    }
  };

  const getData = async () => {
    if (!id) return;
    try {
      const res = await GetProductByIdREQ({
        id: +id,
      });
      const data = res?.data;
      // console.log("idProductData", data);
      setData({
        id: data?.id,
        img: data?.images,
        title: data?.brand?.name,
        subTitle: data?.name,
        price: data?.cost,
        discount: data?.preCost,
        article: data?.code,
        details: null,
        property: false,
        colors: [""],
        colorProduct: data?.color?.name,
        description: data?.description,
        structure: data?.structure,
      });
      setSizes(data?.sizes);
    } catch (e) {
      console.log(e);
    }
  };

  // const getSeriesId = async () => {
  //   if (!id) return;
  //   try {
  //     const res = await GetProductByIdREQ({
  //       SeriesId: +id,
  //     });
  //     const data = res?.data;
  //     console.log("idProductData", data);
  //     // setData({
  //     //   id: data?.id,
  //     //   img: data?.fileNames,
  //     //   title: data?.brand?.name,
  //     //   subTitle: data?.name,
  //     //   price: data?.cost,
  //     //   discount: data?.preCost,
  //     //   article: data?.code,
  //     //   details: null,
  //     //   property: false,
  //     //   colors: [""],
  //     //   colorProduct: data?.color?.name,
  //     //   description: data?.description,
  //     //   structure: data?.structure,
  //     // });
  //     setSizes(data?.sizes);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  const {
    // id,
    img,
    title,
    subTitle,
    price,
    discount,
    article,
    details,
    colors,
    colorProduct,
  } = data;
  console.log("basketItems", basketItems);
  return (
    <div className="product-page">
      <main className="max-width">
        <div className="product-page-images">
          {Array.isArray(img) &&
            img.map((e, i) => (
              <Image
                src={getFileURL(e)}
                key={i}
                alt={`product-img-${i}`}
                width={668}
                height={890}
              />
            ))}
        </div>
        <div className="product-page-details">
          <ProductDetails details={details} />
          <div className="product-page-header">
            <h1>{title}</h1>
            <h2>{subTitle}</h2>

            <div>
              <p>Артикул: {article}</p> <span>|</span>
              <h3>Цвет: {colorProduct || ""}</h3>
            </div>
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
          {img[0] && <ColorProduct colors={[img[0]]} />}
          {sizes && (
            <SizesProduct
              sizes={sizes}
              value={selectSize}
              onChange={(size) => setSelectSize(size)}
            />
          )}
          {id && (
            <ButtonAddProduct
              onClick={() =>
                addProdductToBasket({
                  id: +id,
                  size: selectSize as sizeT,
                })
              }
              id={+id}
            />
          )}
          <Description
            title="Описание"
            description={data?.description as string}
          />
          <Description title="Состав" description={data?.structure as string} />
          <HiddenDescription
            title="Доставка и возврат"
            description={`В Душанбе доставка занимает от нескольких часов, по \n Таджикистану — от нескольких дней.  Вы можете вернуть \n товар, лично посетив наш магазин, предварительно \n согласовав возврат  с нами по телефону. \n \n
Для уточнения деталей обращайтесь к нашим менеджерам`}
          />
        </div>
      </main>
      <ProductItems title={"Похожие товары"} Limit={3} type={"goBack"} />
      <PartnerStores />
    </div>
  );
}
