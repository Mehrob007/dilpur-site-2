import React, { useEffect, useState, useCallback } from "react";
import { GetProductByIdREQ } from "@/api/product/product";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getFileURL } from "@/utils/getFileURL";

export default function ColorProductItem({
  id,
  // index,
}: {
  id: number;
  index: number;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const [data, setData] = useState<{ images: string[]; id: number } | null>(
    null,
  );
  const getData = useCallback(async () => {
    try {
      const res = await GetProductByIdREQ({ id: id });
      if (res && res.data) {
        setData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Image
      onClick={() => router.push("/" + pathName?.split("/")?.[1] + "/" + id)}
      key={id}
      src={getFileURL(data?.images[0] as string)}
      alt={"color-product-img"}
      width={82.5}
      height={127}
      className={id !== +pathName?.split("/")?.[2] ? "off-color" : ""}
    />
  );
}
