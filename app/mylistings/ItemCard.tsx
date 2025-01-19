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

interface ItemCardProps {
  image: string;
  price: number;
  title: string;
  location: string;
  tags?: string[];
  contact?: string;
  date?: string;
  imageURL: string;
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
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="group">
            <Image
              src={imageURL || "/bench.jpg"}
              alt={title || "Listing image"}
              width={350}
              height={500}
              className="rounded-lg"
            />
            <div className="mt-1 group-hover:underline text-left">
              <h1 className="font-semibold text-md">${price}</h1>
              <h1 className="text-sm">{title}</h1>
              <h1 className="text-gray-400 text-sm">{location}</h1>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              This is a detailed view of the listing. Additional information can be added here.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemCard;
