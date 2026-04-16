import { ProductItemT } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import PropertyOff from "../../../public/icons/PropertyOff.svg";
import PropertyOn from "../../../public/icons/PropertyOn.svg";

import { useStore } from "@/store/globalState";
import BayButton from "@/components/ui/BayButton";
import ProductDetails from "@/components/ui/ProductDetails";
import { usePathname, useRouter } from "next/navigation";
import { getFileURL } from "@/utils/getFileURL";

export default function ProductItem({
  img,
  title,
  subTitle,
  price,
  details,
  discount = 0,
  // property,
  outOfStock = false,
  id,
}: ProductItemT) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { setProperty, deleteProperty, propertys } = useStore();
  const pathName = usePathname();

  // console.table({
  //   img: img,
  //   title: title,
  //   subTitle: subTitle,
  //   price: price,
  //   discount: discount,
  //   details: details,
  //   property: property,
  //   id: id,
  // });

  return (
    <div className="product-item">
      <div className="product-item-img">
        <div
          className="image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            onClick={() => router.push(`/${pathName.split("/")[1]}/` + id)}
            className="img-product"
            src={
              !isHovered
                ? getFileURL(img[0] as string)
                : getFileURL(img[1] as string)
            }
            alt="img-product"
            width={360}
            height={500}
          />
          <BayButton id={id || 0} cost={price} preCost={discount} />
        </div>

        {/* <ProductDetails details={details} /> */}
        <ProductDetails
          preCostProcent={
            discount
              ? Math.floor(
                  ((Number(discount) - Number(price)) / Number(discount)) * 100,
                )
              : 0
          }
          details={details as string[]}
        />

        {/* {details && typeof details === "object" ? (
          <span className="product-item-img-discount">
            -{details.discount}%
          </span>
        ) : details === "new" ? (
          <span className="product-item-img-new">НОВИНКА</span>
        ) : (
          ""
        )} */}
        <div className="property-like">
          {propertys?.includes(id as number) ? (
            <Image
              src={PropertyOn}
              alt="PropertyOn"
              onClick={() => deleteProperty(id as number)}
              width={30}
              height={30}
            />
          ) : (
            <Image
              src={PropertyOff}
              alt="PropertyOff"
              onClick={() => setProperty(id as number)}
              width={30}
              height={30}
            />
          )}
        </div>
      </div>
      <div className="product-item-info">
        <div className="product-item-text">
          <h1 onClick={() => router.push(`/${pathName.split("/")[1]}/` + id)}>
            {title}
          </h1>
          <p>{subTitle}</p>
        </div>
        <div className="product-item-price">
          {outOfStock ? (
            <span className="out-of-stock">Нет в наличии</span>
          ) : (
            <>
              {discount ? (
                <>
                  <div className="discount">{discount} c.</div>{" "}
                  <div className="crossed">{price} c.</div>
                </>
              ) : (
                <div className="price">{price} c.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
