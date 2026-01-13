import { useGlobalState } from "@/store/globalState";
import location from "../../../public/icons/locationIconBlack.svg";
import XBlack from "../../../public/icons/XBlack.svg";
import Image from "next/image";
import React from "react";

export default function ShopItem() {
  const { checkKeyModal, shopItem, setOpenModalKey } = useGlobalState();
  if (!checkKeyModal("ModalShop")) return;
  return (
    <div className="shop-item">
      <main>
        <Image
          src={XBlack}
          onClick={() => setOpenModalKey("")}
          alt="XBlack"
          width={24}
          height={24}
        />
        <nav></nav>
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
          <div>
            <span>{shopItem?.phones}</span>
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
