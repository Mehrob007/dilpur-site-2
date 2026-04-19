"use client";
import { GetProductByIdREQ } from "@/api/product/product";
import { GetSeriesByIdREQ } from "@/api/series/series";
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
import React, { useEffect, useState, useCallback } from "react";

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState<ProductItemT | null>(null);
  const [loading, setLoading] = useState(true);
  const [sizes, setSizes] = useState<defDataT[] | null>(null);
  const [selectSize, setSelectSize] = useState<sizeT>();
  const [activeImage, setActiveImage] = useState(0);
  const [seriesProducts, setSeriesProducts] = useState<{
    loading: boolean;
    data: number[] | undefined;
  } | null>(null);
  const { setBasketItems } = useGlobalState();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveImage(index);
  };

  const addProdductToBasket = ({
    id,
    size,
    cost,
    preCost,
  }: {
    id: number;
    size: sizeT;
    cost: number;
    preCost?: number;
  }) => {
    const basketIds: {
      id: number;
      size: sizeT;
      count: number;
      cost: number;
      preCost?: number;
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
          }),
        ),
      );
      setBasketItems(
        basketIds.map((e) => {
          if (e.id === id) {
            return { ...e, count: e.count + 1 };
          } else {
            return e;
          }
        }),
      );
    } else {
      localStorage.setItem(
        "basketIds",
        JSON.stringify([...basketIds, { id, size, count: 1, cost, preCost }]),
      );
      setBasketItems([...basketIds, { id, size, count: 1, cost, preCost }]);
    }
  };

  const getData = useCallback(async () => {
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
        // details: null,
        property: false,
        colors: [""],
        colorProduct: data?.color?.name,
        description: data?.description,
        structure: data?.structure,
        series: data?.series,
        shop: data?.shop,
      });
      setSizes(data?.sizes);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const getSeriesById = useCallback(async (id: number) => {
    try {
      setSeriesProducts({ loading: true, data: undefined });
      const res = await GetSeriesByIdREQ({ Id: id });
      const data: { productIds: number[]; id: number } = res?.data;
      // console.log("idProductData", data?.productIds);
      setSeriesProducts({
        loading: false,
        data: data?.productIds.filter((e) => e !== data?.id),
      });
    } catch (e) {
      setSeriesProducts({ loading: false, data: undefined });
      console.log(e);
    }
  }, []);
  useEffect(() => {
    if (data?.series?.id) getSeriesById(data?.series?.id);
  }, [data, getSeriesById]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return (
      <div className="product-page">
        <main className="max-width">
          <div className="product-page-images product-page-skeleton-images">
            <div className="skeleton-img" />
            <div className="skeleton-img" />
            <div className="skeleton-img" />
            <div className="skeleton-img" />
          </div>
          <div className="product-page-details">
            <div className="product-page-header">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-subtitle" />
              <div className="skeleton-line skeleton-meta" />
            </div>
            <div className="skeleton-line skeleton-price" />
            <div className="skeleton-sizes">
              <div className="skeleton-line skeleton-size-btn" />
              <div className="skeleton-line skeleton-size-btn" />
              <div className="skeleton-line skeleton-size-btn" />
              <div className="skeleton-line skeleton-size-btn" />
            </div>
            <div className="skeleton-line skeleton-add-btn" />
            <div className="skeleton-line skeleton-desc" />
            <div className="skeleton-line skeleton-desc" />
            <div className="skeleton-line skeleton-desc-short" />
            <div className="skeleton-line skeleton-desc" />
          </div>
        </main>
      </div>
    );
  }

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
    // colors,
    shop,
    colorProduct,
  } = data;

  return (
    <div className="product-page product-page-loaded">
      <main className="max-width">
        <div className="product-page-images-container">
          <div className="product-page-images" onScroll={handleScroll}>
            {Array.isArray(img) &&
              img.map((e, i) => (
                <Image
                  src={getFileURL(e as string)}
                  key={i}
                  alt={`product-img-${i}`}
                  width={668}
                  height={890}
                />
              ))}
          </div>
          <div className="product-image-dots">
            {Array.isArray(img) &&
              img.map((_, i) => (
                <span
                  key={i}
                  className={activeImage === i ? "active-dot" : ""}
                />
              ))}
          </div>
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
                <div className="discount">{discount} c.</div>
                <div className="crossed">{price} c.</div>
              </>
            ) : (
              <div className="price">{price} c.</div>
            )}
          </div>
          {seriesProducts?.data && data?.id && (
            <ColorProduct
              colorsIds={[
                ...seriesProducts?.data?.filter((e) => e !== data?.id),
                data?.id,
              ].sort((a, b) => a - b)}
            />
          )}
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
                  cost: price,
                  preCost: discount,
                })
              }
              id={+id}
              shop={shop}
            />
          )}
          <Description
            title="Описание"
            description={data?.description as string}
          />
          <Description title="Состав" description={data?.structure as string} />
          <HiddenDescription
            title="Доставка и возврат"
            description={`В Душанбе доставка занимает от нескольких часов, по \n Таджикистану — от нескольких дней.  Вы можете вернуть \n товар, лично посетив наш магазин, предварительно \n согласовав возврат  с нами по телефону. \n
Для уточнения деталей обращайтесь к нашим менеджерам`}
          />
        </div>
      </main>
      <ProductItems title={"Похожие товары"} Limit={3} type={"goBack"} />
      <PartnerStores />
    </div>
  );
}
