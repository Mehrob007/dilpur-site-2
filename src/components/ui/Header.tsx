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
   const [isHovered, setIsHovered] = useState(false);
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
              onClick={() =>
                redirect(pathName.includes("/male") ? "/male" : "/female")
              }
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
              src={search}
              style={{
                opacity: openNav.type === "filter" && openNav.open ? 0 : 1,
              }}
              alt="icons-header"
              onClick={() => {
                setOpenNav({ type: "filter", open: true });
              }}
              width={24}
              height={24}
            />
            <Image src={favorites} alt="icons-header" width={24} height={24} />
            <Image
              src={basket}
              alt="icons-header"
              onClick={() => setOpenBasket(!openBasket)}
              width={24}
              height={24}
            />
            <Image src={profile} alt="icons-header" width={24} height={24} />
            <BasketItems open={openBasket} />
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
