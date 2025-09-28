"use client";
import Image from "next/image";
import React from "react";
import giftCard1 from "../../../public/images/giftCord1.svg";
import giftCard2 from "../../../public/images/giftCord2.svg";
import arrow from "../../../public/icons/arrow.svg";
import { usePathname, useRouter } from "next/navigation";

export default function GiftСard() {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div
      className="gift-card max-width"
      onClick={() => router.push("/" + pathName?.split("/")?.[1] + "/gift-card")}
    >
      <div className="gift-card-top">
        <h1>ПОДАРОЧНАЯ</h1>

        <Image
          className="gift-card1"
          src={giftCard1}
          alt="img-gift-card"
          width={500}
          height={300}
        />
        <Image
          className="gift-card2"
          src={giftCard2}
          alt="img-gift-card"
          width={500}
          height={300}
        />

        <h1 className="card">КАРТА</h1>
      </div>
      <div className="gift-card-bottom">
        <p>
          Оформите подарочную карту в любой магазин партнёр <br /> То, что
          порадует друга, мужа, отца или коллегу в любой праздник
        </p>
        <button>
          <span>
            Оформить карту{" "}
            <Image src={arrow} alt="arrow" width={15} height={12} />
          </span>
        </button>
      </div>
    </div>
  );
}
