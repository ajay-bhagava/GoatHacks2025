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
    tags?: string,
    contact?: string;
    date?: string;
    description: string;
}
const ItemCard: React.FC<ItemCardProps> = ({price,title, description,location,tags,contact, date, imageURL}) => {
  return(
      <div>
          <Dialog>
              <DialogTrigger>
                  <div className={"group min-h-[400px] p-2 rounded-lg bg-gray-200"}>
                      <Image src={imageURL || "/bench.jpg"} alt={"byeu"} width={350} height={500} className={"rounded-lg object-cover max-h-[300px]"}/>
                      <div className={"mt-1 group-hover:underline text-left"}>
                          <h1 className={"font-semibold text-md"}>${price}</h1>
                          <h1 className={"text-sm"}>{title}</h1>
                          <h1 className={"text-gray-400 text-sm"}>{location}</h1>
                      </div>
                  </div>
              </DialogTrigger>
              <DialogContent>

                  <div className={"grid grid-cols-2 gap-x-3"}>
                      <Image src={imageURL || "/bench.jpg"} alt={"byeu"} width={500} height={750} className={"rounded-lg object-cover max-h-[600px]"}/>
                      <DialogHeader>
                          <DialogTitle className={"text-2xl"}>{title}</DialogTitle>
                          <DialogDescription>
                              <h1 className={"font-semibold text-xl text-black"}>${price}</h1>
                              {tags}
                              {contact}
                              <h1 className={"mt-10"}>{description}</h1>
                          </DialogDescription>
                      </DialogHeader>
                  </div>
              </DialogContent>
          </Dialog>
      </div>

  )
}

export default ItemCard
