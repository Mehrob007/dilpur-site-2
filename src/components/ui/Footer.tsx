"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoFooter from "../../../public/icons/logoFooter.svg";
import bgImageFooter from "../../../public/images/bgImageFooter.svg";
import facebook from "../../../public/icons/facebook.svg";
import telegram from "../../../public/icons/telegram.svg";
import instagram from "../../../public/icons/instagram.svg";
import whatsapp from "../../../public/icons/whatsapp.svg";
import location from "../../../public/icons/locationIcon.svg";
import creatory from "../../../public/icons/creatory.svg";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { forBuyers, navLinks } from "@/constants/header";
import { GetShopREQ } from "@/api/shop/shop";
import { shopT } from "@/types/shop";
import { useGlobalState } from "@/store/globalState";
import ShopItem from "@/modules/shop/ShopItem";

export default function Footer() {
  const pathName = usePathname();

  const { setOpenModalKey, setShopItem } = useGlobalState();

  const [shops, setShops] = useState<shopT[]>([]);

  const getShops = async () => {
    try {
      const res = await GetShopREQ();
      const data = res?.data;
      setShops(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getShops();
  }, []);
  return (
    <>
      <div className="footer">
        <Image
          src={bgImageFooter}
          alt="bgImageFooter"
          width={430}
          height={479}
        />
        <div className="footer-top max-width">
          <div className="footer-contacts">
            <Image src={logoFooter} alt="logoFooter" width={240} height={61} />
            <div>
              <p>
                Проконсультируем вас по любым вопросам. Работаем ежедневно с
                9:00 до 21:00
              </p>
              <div>
                <h1>+992 556 444 558</h1>
                <h1>+992 999 444 555</h1>
              </div>
              <nav>
                <Image
                  src={facebook}
                  onClick={() => redirect("/")}
                  alt="facebook"
                  width={18}
                  height={18}
                />
                <Image
                  src={telegram}
                  onClick={() => redirect("/")}
                  alt="telegram"
                  width={18}
                  height={18}
                />
                <Image
                  src={instagram}
                  onClick={() => redirect("/")}
                  alt="instagram"
                  width={18}
                  height={18}
                />
                <Image
                  src={whatsapp}
                  onClick={() => redirect("/")}
                  alt="whatsapp"
                  width={18}
                  height={18}
                />
              </nav>
            </div>
          </div>
          <div className="footer-nav">
            <h1>Навигация</h1>
            <nav>
              {navLinks.map((e, i) => {
                if (e.label === "Акции") return;
                return (
                  <Link href={`/${pathName.split("/")[1]}${e.href}`} key={i}>
                    {e.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="footer-nav">
            <h1>Покупателям</h1>
            <nav>
              {forBuyers.map((e, i) => {
                return (
                  <Link href={`/${pathName.split("/")[1]}${e.href}`} key={i}>
                    {e.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="footer-bottom max-width">
          <div className="footer-bottom-content">
            <h1>Адреса магазинов</h1>
            <div className="footer-gps">
              {shops &&
                shops.map((e, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setOpenModalKey("ModalShop");
                      setShopItem(e);
                    }}
                  >
                    <h1>
                      <Image
                        src={location}
                        alt="location"
                        width={16}
                        height={16}
                      />
                      <span>{e.name}</span>
                    </h1>
                    <p>{e.address}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="logo-creatory">
            <h1>Разработано в</h1>
            <Image src={creatory} alt="creatory" width={153.44} height={34} />
          </div>
        </div>
        <div className="footer-text max-width">
          <p>2025 Dilpur Group</p>
        </div>
      </div>
      <ShopItem />
    </>
  );
}
