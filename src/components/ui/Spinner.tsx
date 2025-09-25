import React from "react";
import logoPart1 from "../../../public/icons/logoPart1.svg";
import logoPart2 from "../../../public/icons/logoPart2.svg";
import logoPart3 from "../../../public/icons/logoPart3.svg";
import logoPart4 from "../../../public/icons/logoPart4.svg";
import Image from "next/image";

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="items">
        <div>
          <Image src={logoPart1} alt="logoPart1" width={237} height={60} />
        </div>
        <div>
          <Image src={logoPart2} alt="logoPart2" width={223} height={90} />
        </div>
        <div>
          <Image src={logoPart3} alt="logoPart3" width={256.83} height={60} />
        </div>
        <div>
          <Image src={logoPart4} alt="logoPart4" width={230} height={90} />
        </div>
        <div>
          <Image src={logoPart1} alt="logoPart1" width={237} height={60} />
        </div>
        <div>
          <Image src={logoPart2} alt="logoPart2" width={223} height={90} />
        </div>
        <div>
          <Image src={logoPart3} alt="logoPart3" width={256.83} height={60} />
        </div>
        <div>
          <Image src={logoPart4} alt="logoPart4" width={230} height={90} />
        </div>
        <div>
          <Image src={logoPart1} alt="logoPart1" width={237} height={60} />
        </div>
        <div>
          <Image src={logoPart2} alt="logoPart2" width={223} height={90} />
        </div>
        <div>
          <Image src={logoPart3} alt="logoPart3" width={256.83} height={60} />
        </div>
        <div>
          <Image src={logoPart4} alt="logoPart4" width={230} height={90} />
        </div>
        <div>
          <Image src={logoPart1} alt="logoPart1" width={237} height={60} />
        </div>
        <div>
          <Image src={logoPart2} alt="logoPart2" width={223} height={90} />
        </div>
        <div>
          <Image src={logoPart3} alt="logoPart3" width={256.83} height={60} />
        </div>
        <div>
          <Image src={logoPart4} alt="logoPart4" width={230} height={90} />
        </div>
      </div>
    </div>
  );
}
