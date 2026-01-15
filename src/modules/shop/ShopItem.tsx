import { useGlobalState } from "@/store/globalState";
import location from "../../../public/icons/locationIconBlack.svg";
import XBlack from "../../../public/icons/XBlack.svg";
import Image from "next/image";
import React from "react";
import { getFileURL } from "@/utils/getFileURL";

export default function ShopItem() {
  const { checkKeyModal, shopItem, setOpenModalKey } = useGlobalState();
  if (!checkKeyModal("ModalShop")) return;
  return (
    <div className="shop-item" onClick={() => setOpenModalKey("")}>
      <main>
        <Image
          src={XBlack}
          onClick={() => setOpenModalKey("")}
          alt="XBlack"
          width={24}
          height={24}
        />
        <nav>
          <Image
            src={getFileURL(shopItem?.fileName as string)}
            alt="shop"
            width={120}
            height={120}
          />
        </nav>
        <main>
          <div>
            <h1>{shopItem?.name}</h1>
            <p>
              <Image src={location} alt="location" width={24} height={24} />
              {shopItem?.address}
            </p>
          </div>
          <div>
            <h2>График работы</h2>
            <span>{shopItem?.working}</span>
          </div>

          <div className="phone">
            {shopItem?.phones?.map((phone, i) => (
              <span key={i}>+992 {phone.replace(/(.{3})(?=.)/g, "$1-")}</span>
            ))}
          </div>
          <button
            className="button"
            onClick={() => (document.location.href = shopItem?.url as string)}
          >
            Построить маршрут
          </button>
        </main>
      </main>
    </div>
  );
}
