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
import { redirect, usePathname } from "next/navigation";
import { defaultSubHeader, links, navLinks } from "@/constants/header";
import BasketItems from "@/modules/basket/BasketItems";
import SubHeader from "./SubHeader";
import { defaultSubHeaderT } from "@/types/def";

export default function Header() {
  const [openNav, setOpenNav] = useState<defaultSubHeaderT>(defaultSubHeader);
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState<number>(0);
  const [openBasket, setOpenBasket] = useState<boolean>(false);

  useEffect(() => {
    setOpenNav(defaultSubHeader);
  }, [pathName]);

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
              onClick={() =>
                setOpenNav({
                  type: "navigation",
                  open: !(openNav.type == "navigation" && openNav.open),
                })
              }
              src={
                openNav.type == "navigation" && openNav.open
                  ? closeNav
                  : burgerIcons
              }
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
                display:
                  openNav.type === "filter" && openNav.open ? "none" : "flex",
                opacity: Boolean(!isHovered) || isHovered === 1 ? "1" : "0.2",
              }}
              alt="icons-header"
              onClick={() => {
                setOpenNav({ type: "filter", open: true });
              }}
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
            />
            <Image
              style={{
                opacity: Boolean(!isHovered) || isHovered === 3 ? "1" : "0.2",
              }}
              onMouseEnter={() => setIsHovered(3)}
              onMouseLeave={() => setIsHovered(0)}
              src={basket}
              alt="icons-header"
              onClick={() => setOpenBasket(!openBasket)}
              width={24}
              height={24}
            />
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
            <BasketItems open={openBasket} setOpen={setOpenBasket} />
          </div>
        </div>
      </div>
      <SubHeader
        navLinks={navLinks}
        openNav={openNav.open}
        type={openNav.type}
        setOpenNav={setOpenNav}
      />
    </div>
  );
}
