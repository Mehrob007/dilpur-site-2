"use client";
import { SubHeaderT } from "@/types/def";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import InputSearch from "../element/InputSearch";
import { defaultSubHeader, popularQueries } from "@/constants/header";
import Image from "next/image";
import searchIcon from "@/../public/icons/searchIcon.svg";

export default function SubHeader({
  navLinks,
  openNav,
  type,
  setOpenNav,
}: SubHeaderT) {
  const [searchValue, setSearchValue] = useState<string>("");
  const pathName = usePathname();
  if (type === "filter") {
    return (
      <div
        className="header-nav header-nav-search"
        style={{ top: openNav ? "70px " : "" }}
      >
        <div className="header-nav-content max-width">
          <div className="header-nav-search-input">
            <InputSearch
              placeholder="Введите запрос"
              value={searchValue}
              onChange={(e) => setSearchValue(e)}
            />
            <nav>
              <button>Найти</button>
              <button
                onClick={() =>
                  setOpenNav({ ...defaultSubHeader, type: "filter" })
                }
              >
                Закрыть
              </button>
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
    );
  }
  if (type === "navigation") {
    return (
      <div className="header-nav" style={{ top: openNav ? "70px " : "" }}>
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
    );
  }
}
