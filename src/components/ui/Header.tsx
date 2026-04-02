"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import burgerIcons from "../../../public/icons/burger.svg";
import logoTitle from "../../../public/icons/logoTitle.svg";
import search from "../../../public/icons/search.svg";
import favorites from "../../../public/icons/favorites.svg";
import basket from "../../../public/icons/basket.svg";
import profile from "../../../public/icons/profile.svg";
import closeNav from "../../../public/icons/closeNav.svg";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { defaultSubHeader, links, navLinks } from "@/constants/header";
import BasketItems from "@/modules/basket/BasketItems";
import SubHeader from "./SubHeader";
import { defaultSubHeaderT } from "@/types/def";
import { useGlobalState, useStore } from "@/store/globalState";
import { GetTypeREQ } from "@/api/type/type";

export default function Header() {
  const { setOpenModalKey, checkKeyModal, openModalKey, setType, basketItems } =
    useGlobalState();
  const [openNav, setOpenNav] = useState<defaultSubHeaderT>(defaultSubHeader);
  const [isHovered, setIsHovered] = useState<number>(0);
  const { propertys, updatePropertys } = useStore();
  const router = useRouter();
  const pathName = usePathname();

  const getType = React.useCallback(async () => {
    try {
      const sender = pathName?.includes("/female") ? 1 : 0;
      const res = await GetTypeREQ({ Gender: sender });

      setType(res.data.reverse());
    } catch (e) {
      console.error(e);
    }
  }, [pathName, setType]);

  useEffect(() => {
    setOpenNav({ open: false, type: "navigation" });
    setOpenModalKey("");
  }, [pathName]);

  useEffect(() => {
    if (openNav) {
      setOpenModalKey("");
    }
  }, [openNav.open]);

  const pathSegment = pathName?.split("/")?.[1];

  useEffect(() => {
    getType();
  }, [getType, pathSegment]);

  useEffect(() => {
    const prop = localStorage.getItem("favorites");
    if (!prop) return;
    updatePropertys(JSON.parse(prop));
  }, [updatePropertys]);

  useEffect(() => {
    // const favorites = localStorage.getItem("favorites");
    if (!propertys) return;
    localStorage.setItem("favorites", JSON.stringify(propertys));
  }, [propertys]);

  // console.log("propertys", propertys);

  return (
    <div className="header">
      <div className="header-main">
        <div className="header-content  max-width">
          <div className="logoTitle">
            <Image
              src={logoTitle}
              alt="logoTitle"
              onClick={() => redirect("/" + pathName?.split("/")?.[1])}
              width={188}
              height={40}
            />
          </div>
          <div className="header-content-left">
            <Image
              onClick={() => setOpenModalKey("navigation")}
              src={checkKeyModal("navigation") ? closeNav : burgerIcons}
              alt="burgerIcons"
              width={24}
              height={24}
            />
            {links.map((e, i) => {
              const isActive = pathName.includes(e.href);
              return (
                <Link
                  href={e.href}
                  key={i}
                  className={`${isActive ? "active-link" : ""}`}
                >
                  {e.label}
                </Link>
              );
            })}
          </div>
          <div className="header-content-right">
            <Image
              onMouseEnter={() => setIsHovered(1)}
              onMouseLeave={() => setIsHovered(0)}
              src={search}
              style={{
                display: checkKeyModal("filter") ? "none" : "flex",
                opacity: Boolean(!isHovered) || isHovered === 1 ? "1" : "0.2",
              }}
              alt="icons-header"
              onClick={() => setOpenModalKey("filter")}
              width={24}
              height={24}
            />
            <Image
              style={{
                opacity: Boolean(!isHovered) || isHovered === 2 ? "1" : "0.2",
              }}
              onMouseEnter={() => setIsHovered(2)}
              onMouseLeave={() => setIsHovered(0)}
              src={favorites}
              alt="icons-header"
              width={24}
              height={24}
              onClick={() => router.push("/favorites")}
            />
            <div className="icons-basket">
              <Image
                style={{
                  opacity: Boolean(!isHovered) || isHovered === 3 ? "1" : "0.2",
                }}
                onMouseEnter={() => setIsHovered(3)}
                onMouseLeave={() => setIsHovered(0)}
                src={basket}
                alt="icons-header"
                onClick={() => setOpenModalKey("basket")}
                width={24}
                height={24}
              />
              {basketItems?.length ? <span>{basketItems?.length}</span> : ""}
            </div>
            <Image
              style={{
                opacity: Boolean(!isHovered) || isHovered === 4 ? "1" : "0.2",
              }}
              onMouseEnter={() => setIsHovered(4)}
              onMouseLeave={() => setIsHovered(0)}
              src={profile}
              alt="icons-header"
              width={24}
              height={24}
            />
            <BasketItems
              open={checkKeyModal("basket")}
              onClose={() => setOpenModalKey("")}
            />
          </div>
        </div>
      </div>
      <SubHeader
        navLinks={navLinks}
        type={openModalKey}
        setOpenNav={setOpenNav}
      />
    </div>
  );
}
