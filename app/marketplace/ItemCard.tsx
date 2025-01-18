import Image from "next/image";
import React from "react";

interface ItemCardProps {
    price: number,
    title: string,
    location: string;
    tags?: [],
    contact?: string;
    date?: string;
}
const ItemCard: React.FC<ItemCardProps> = ({price,title,location,tags,contact, date}) => {
  return(
      <div>
          <Image src={"/bench.jpg"} alt={"byeu"} width={350} height={500} className={"rounded-lg"}/>
          <div className={"mt-1"}>
              <h1 className={"font-semibold text-md"}>${price}</h1>
              <h1 className={"text-sm"}>{title}</h1>
              <h1 className={"text-gray-400 text-sm"}>{location}</h1>
          </div>
      </div>
  )
}

export default ItemCard