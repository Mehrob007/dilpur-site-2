"use client";
import { SubHeaderT } from "@/types/def";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import InputSearch from "../element/InputSearch";
import { popularQueries } from "@/constants/header";

import Image from "next/image";
import searchIcon from "@/../public/icons/searchIcon.svg";
import { useGlobalState } from "@/store/globalState";
import ProductItems from "@/modules/product/ProductItems";
import arrowForButton from "@/../public/icons/arrow-right-white-small.svg";

import { GetShopREQ } from "@/api/shop/shop";
import { shopT } from "@/types/shop";
import locationIcon from "@/../public/icons/locationIcon.svg";
// import profileIcon from "@/../public/icons/profile.svg";

export default function SubHeader({ navLinks }: SubHeaderT) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setOpenModalKey, checkKeyModal, setShopItem, gender, setGender } =
    useGlobalState();
  const pathName = usePathname();
  const router = useRouter();

  const [shops, setShops] = useState<shopT[]>([]);

  const getShops = async () => {
    try {
      const res = await GetShopREQ();
      if (res && res.data) {
        setShops(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  useEffect(() => {
    setSearchValue("");
  }, [pathName]);

  return (
    <>
      <div
        className={`header-nav header-nav-search ${checkKeyModal("filter") ? "isOpen" : ""}`}
      >
        <div className="header-nav-content max-width">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchValue.trim()) {
                router.push("/" + gender + "/catalog?name=" + searchValue);
                setOpenModalKey("");
                setSearchValue("");
              }
            }}
            className="header-nav-search-input"
          >
            <InputSearch
              placeholder="Введите запрос"
              value={searchValue}
              onChange={(e) => setSearchValue(e)}
            />
            <nav>
              <button type="submit">Найти</button>
              <button
                type="button"
                onClick={() => {
                  setOpenModalKey("");
                  setSearchValue("");
                }}
              >
                Закрыть
              </button>
            </nav>
          </form>
          {searchValue.length ? (
            <div className="header-nav-search-products">
              <ProductItems
                type={null}
                title="Результаты поиска"
                Limit={3}
                searchName={searchValue}
              />
              <button
                onClick={() => {
                  router.push("/" + gender + "/catalog?name=" + searchValue);
                  setOpenModalKey("");
                  setSearchValue("");
                }}
                className="button-search-nav"
              >
                Смотреть все результаты{" "}
                <Image src={arrowForButton} alt="arrowForButton" />
              </button>
            </div>
          ) : (
            <div className="header-nav-search-res">
              <h1>Популярные запросы</h1>
              <div>
                {popularQueries.map((e, i) => (
                  <span key={i} onClick={() => console.log(e.value)}>
                    <Image
                      src={searchIcon}
                      alt="searchIcon"
                      width={16}
                      height={16}
                    />{" "}
                    {e.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`header-nav ${checkKeyModal("navigation") ? "isOpen" : ""}`}
      >
        <div className="header-nav-content">
          <div className="mobile-menu-header">
            <div
              className={`gender-tab ${gender === "male" ? "active" : ""}`}
              onClick={() => {
                router.push("/male");
                setGender("male");
              }}
            >
              Мужчинам
            </div>
            <div
              className={`gender-tab ${gender === "female" ? "active" : ""}`}
              onClick={() => {
                router.push("/female");
                setGender("female");
              }}
            >
              Женщинам
            </div>
          </div>
          <div className="mobile-only-links">
            {navLinks.map((e, i) => {
              const isActive = pathName.includes(e.href);
              return (
                <Link
                  href={`/${gender}${e.href}`}
                  key={i}
                  className={`${isActive ? "active-link" : ""}`}
                >
                  {e.label}
                </Link>
              );
            })}
          </div>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-secondary-links">
              <Link href="/favorites">Избранное</Link>
              <Link href="/profile">Войти</Link>
              <Link href="/delivery">Доставка</Link>
            </div>

            <div className="mobile-menu-shops">
              <h1>Магазины</h1>
              <div className="shops-list">
                {shops.map((e, i) => (
                  <div
                    key={i}
                    className="mobile-shop-item"
                    onClick={() => {
                      setOpenModalKey("ModalShop");
                      setShopItem(e);
                    }}
                  >
                    <Image
                      src={locationIcon}
                      alt="location"
                      width={16}
                      height={16}
                    />
                    <span>{e.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="desktop-links">
            {navLinks.map((e, i) => {
              const isActive = pathName.includes(e.href);
              return (
                <Link
                  href={`/${gender}${e.href}`}
                  key={i}
                  className={`${isActive ? "active-link" : ""}`}
                >
                  {e.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
