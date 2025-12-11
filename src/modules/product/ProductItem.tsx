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
import { GetProductREQ } from "@/api/product/product";

export default function ProductItem({
  img,
  title,
  subTitle,
  price,
  discount = 0,
  details = null,
  property,
  outOfStock = false,
  id,
}: ProductItemT) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { setProperty, deleteProperty } = useStore();
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
            src={!isHovered ? getFileURL(img[0]) : getFileURL(img[1])}
            alt="img-product"
            width={360}
            height={500}
          />
          <BayButton id={id || 0} />
        </div>

        <ProductDetails details={details} />

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
          {property ? (
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
          {!outOfStock ? (
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
