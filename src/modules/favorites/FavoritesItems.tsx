"use client";
import React, { useEffect, useState } from "react";
import FavoritesItem from "./FavoritesItem";
import ProductItemsError from "../product/ProductItemsError";

export default function FavoritesItems({
  ids,
  title,
}: {
  ids: number[];
  title: string;
}) {
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!ids.length) {
      setError(true);
    } else {
      setError(false);
    }
  }, [ids]);
  return (
    <div className="product-items max-width">
      <div className="product-items-header">
        <h1>{title}</h1>

        {/* <TypesProductHeader type={type} /> */}
      </div>
      <div
        // onScroll={(e) => scrollHandler(e.currentTarget)}
        className={error ? "" : "product-items-content"}
      >
        {error ? (
          <ProductItemsError />
        ) : (
          ids.map((id) => <FavoritesItem key={id} id={id} />)
        )}
      </div>
    </div>
    // <div>
    //   {ids.map((id) => (
    //     <FavoritesItem key={id} id={id} />
    //   ))}
    // </div>
  );
}
