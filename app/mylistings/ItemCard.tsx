import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import {Trash} from "lucide-react";

interface ItemCardProps {
  image: string;
  price: number;
  title: string;
  location: string;
  tags?: string[];
  contact?: string;
  date?: string;
  imageURL: string;
  description: string;
}

const ItemCard: React.FC<ItemCardProps> = ({
  image,
  price,
  title,
  location,
  tags,
  contact,
  date,
  imageURL,
    description
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="min-h-[400px] p-2 rounded-lg bg-[#f1f1f1]">
            <Image
              src={imageURL || "/bench.jpg"}
              alt={title || "Listing image"}
              width={350}
              height={500}
              className="rounded-lg max-h-[300px] object-cover"
            />
            <div className="mt-1 group-hover:underline text-left">
              <h1 className="font-semibold text-md">${price}</h1>
              <h1 className="text-sm">{title}</h1>
              <h1 className="text-gray-400 text-sm">{location}</h1>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className={"grid grid-cols-2 gap-x-3"}>
            <Image src={imageURL || "/bench.jpg"} alt={"byeu"} width={500} height={750} className={"rounded-lg object-cover max-h-[600px]"}/>
            <DialogHeader>
              <div className={"relative"}>
                <DialogTitle className={"text-2xl"}>{title}</DialogTitle>
                <DialogDescription>
                  <h1 className={"font-semibold text-xl text-black"}>${price}</h1>
                  {tags}
                  {contact}
                  <h1 className={"mt-10"}>{description}</h1>
                </DialogDescription>
              </div>
              <div className={"fixed bottom-6"}>
                <button className={"flex px-2 py-1 bg-red-500 gap-x-2 rounded-md"}>
                    <Trash className={"text-white"}/>
                    <h1 className={"text-white"}>Delete</h1>
                </button>
              </div>
            </DialogHeader>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemCard;
