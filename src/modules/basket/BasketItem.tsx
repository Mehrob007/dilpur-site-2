import React, { useEffect, useState } from "react";
import Image from "next/image";
import trash from "../../../public/icons/Trash.svg";
import { BasketItemT } from "@/types/basket";
import { getFileURL } from "@/utils/getFileURL";
import { ProductItemT, sizeT } from "@/types/product";
import { GetProductByIdREQ } from "@/api/product/product";
import { useGlobalState } from "@/store/globalState";
export default function BasketItem({
  deleteBasketItem,
  id,
  size,
  count,
  order = false,
}: BasketItemT) {
  const [data, setData] = useState<ProductItemT>();
  const { setBasketItems } = useGlobalState();

  const plusCount = ({ id }: { id: number }) => {
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
    }
  };
  const minuseCount = ({ id }: { id: number }) => {
    const basketIds: {
      id: number;
      size: sizeT;
      count: number;
    }[] = JSON.parse(localStorage.getItem("basketIds") || "[]");
    if (
      basketIds?.find((e) => e.id === id) &&
      basketIds?.find((e) => e.id === id)?.count !== 1
    ) {
      localStorage.setItem(
        "basketIds",
        JSON.stringify(
          basketIds.map((e) => {
            if (e.id === id) {
              return { ...e, count: e.count - 1 };
            } else {
              return e;
            }
          })
        )
      );
      setBasketItems(
        basketIds.map((e) => {
          if (e.id === id) {
            return { ...e, count: e.count - 1 };
          } else {
            return e;
          }
        })
      );
    }
  };
  const getDataBasket = async (id: number, size: sizeT) => {
    console.log({ id, size });

    try {
      const res = await GetProductByIdREQ({
        id: id,
      });
      console.log("parseData", res?.data);
      const data = res?.data;
      setData({
        ...data,
        title: data?.brand?.name,
        subTitle: data?.name,
        color: data?.color?.name,
        discount: data?.preCost,
        price: data?.cost,
        img: data?.images,
        article: data?.code,
        size,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getDataBasket(id, size);
  }, []);

  return (
    <div className="basket-item">
      <Image
        src={getFileURL(data?.img[0] as string)}
        alt="images"
        width={130}
        height={180}
      />
      <div>
        <div>
          <h1>{data?.title}</h1>
          <p>{data?.subTitle}</p>
          {order && <span>{data?.article}</span>}
        </div>
        <div>
          <h2>
            <label>{data?.size?.name as string}</label> |{" "}
            <label>{data?.color}</label> | <label>{count} шт.</label>
          </h2>
        </div>
        {!order && (
          <nav>
            <button onClick={() => minuseCount({ id })}>-</button>
            <h2>{count}</h2>
            <button onClick={() => plusCount({ id })}>+</button>
          </nav>
        )}
        <div>
          <div>
            <div className="product-item-price">
              {data?.discount ? (
                <>
                  <div className="discount">{data?.discount * count} c.</div>{" "}
                  <div className="crossed">{data?.price * count} c.</div>
                </>
              ) : (
                <div className="price">{data?.price || 0 * count} c.</div>
              )}
            </div>
            {order && (
              <nav>
                <button onClick={() => minuseCount({ id })}>-</button>
                <h4>{count}</h4>
                <button onClick={() => plusCount({ id })}>+</button>
              </nav>
            )}
            {
              <Image
                onClick={() => {
                  deleteBasketItem(id);
                }}
                src={trash}
                alt="images"
                width={24}
                height={24}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
