import Image from "next/image";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/dialog"


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
          <Dialog>
              <DialogTrigger>
                  <div className={"group"}>
                      <Image src={"/bench.jpg"} alt={"byeu"} width={350} height={500} className={"rounded-lg"}/>
                      <div className={"mt-1 group-hover:underline text-left"}>
                          <h1 className={"font-semibold text-md"}>${price}</h1>
                          <h1 className={"text-sm"}>{title}</h1>
                          <h1 className={"text-gray-400 text-sm"}>{location}</h1>
                      </div>
                  </div>
              </DialogTrigger>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                      </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          </Dialog>
      </div>

  )
}

export default ItemCard