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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ItemCardProps {
    price: number;
    title: string;
    location: string;
    tags?: string;
    contact?: string;
    date?: string;
    description: string;
    imageURLs: string[] | string;
}

const ItemCard: React.FC<ItemCardProps> = ({
                                               price,
                                               title,
                                               description,
                                               location,
                                               tags,
                                               contact,
                                               date,
                                               imageURLs = [],
                                           }) => {
    const images = Array.isArray(imageURLs) ? imageURLs : [imageURLs];


    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className={"group min-h-[400px] p-2 rounded-lg bg-gray-200"}>
                        <Image
                            src={images[0] || "/bench.jpg"}
                            alt={"item image"}
                            width={350}
                            height={500}
                            className={"rounded-lg object-cover max-h-[300px]"}
                        />
                        <div className={"mt-1 group-hover:underline text-left"}>
                            <h1 className={"font-semibold text-md"}>${price}</h1>
                            <h1 className={"text-sm"}>{title}</h1>
                            <h1 className={"text-gray-400 text-sm"}>{location}</h1>
                            {tags && <h1 className={"badge badge-error text-white h-fit"}>{tags}</h1>}
                        </div>
                    </div>
                </DialogTrigger>

                <DialogContent>
                    <div className={"grid grid-cols-2 gap-x-3 p-6"}>
                        <div className="col-span-1">
                            <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    {images.length > 0 ? (
                                        images.map((url, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Image
                                                        src={url}
                                                        alt={`Item Image ${index}`}
                                                        width={500}
                                                        height={750}
                                                        className="rounded-lg object-cover w-full h-full"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <div className="bg-[#e9e9e9] rounded-2xl w-full h-full"></div>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <DialogHeader>
                            <DialogTitle className={"text-2xl"}>{title}</DialogTitle>
                            <DialogDescription>
                                <h1 className={"font-semibold text-xl text-black"}>${price}</h1>
                                {tags && <div>{tags}</div>}
                                {contact && <div>{contact}</div>}
                                <h1 className={"mt-10"}>{description}</h1>
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItemCard;
