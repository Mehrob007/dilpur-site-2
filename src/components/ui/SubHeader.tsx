"use client";
import { SubHeaderT } from "@/types/def";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import InputSearch from "../element/InputSearch";
import { popularQueries } from "@/constants/header";
import Image from "next/image";
import searchIcon from "@/../public/icons/searchIcon.svg";
import { useGlobalState } from "@/store/globalState";

export default function SubHeader({ navLinks, type }: SubHeaderT) {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setOpenModalKey, checkKeyModal } = useGlobalState();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <>
      <div
        className="header-nav header-nav-search"
        style={{ top: checkKeyModal("filter") ? "70px " : "" }}
      >
        <div className="header-nav-content max-width">
          <div className="header-nav-search-input">
            <InputSearch
              placeholder="Введите запрос"
              value={searchValue}
              onChange={(e) => setSearchValue(e)}
            />
            <nav>
              <button
                onClick={() => {
                  router.push(
                    "/" +
                      pathName?.split("/")?.[1] +
                      "/catalog?name=" +
                      searchValue
                  );
                  setOpenModalKey("");
                }}
              >
                Найти
              </button>
              <button onClick={() => setOpenModalKey("")}>Закрыть</button>
            </nav>
          </div>
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
        </div>
      </div>
      <div
        className="header-nav"
        style={{ top: checkKeyModal("navigation") ? "70px " : "" }}
      >
        <div className="header-nav-content">
          {navLinks.map((e, i) => {
            const isActive = pathName.includes(e.href);
            return (
              <Link
                href={`/${pathName.split("/")[1]}${e.href}`}
                key={i}
                className={`${isActive ? "active-link" : ""}`}
              >
                {e.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
