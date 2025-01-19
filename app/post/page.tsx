"use client";
import { ArrowUp } from "lucide-react";
import pb from "../../lib/pocketbase";
import NavBar from "@/components/navbar";
import React, { useState, useEffect } from "react";
import { createPost, loginUser } from "@/lib/pocketbase";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/select";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const Page = () => {
    const [fileName, setFileName] = useState("");
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
            const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        }
    };

    const handleCreatePost = async () => {
        try {
            const userUpdate = await createPost(title, description, price, selectedImages);
            console.log("Post created successfully:", userUpdate);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <NavBar />
            </div>

            <div className="flex flex-1 pt-16">
                {/* Sidebar */}
                <aside
                    className="p-4 w-1/4 h-full shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)] fixed top-16 left-0 overflow-y-auto bg-white">
                    <div className="space-y-4 mb-20">
                        {/* Image Upload */}
                        <div className="flex">
                            <div
                                className="p-4 rounded-3xl text-center bg-[#e9e9e9] size-36 flex flex-col justify-center items-center relative"
                            >
                                {imagePreviews.length > 0 ? (
                                    <div className="flex gap-2">
                                        {imagePreviews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Uploaded ${index}`}
                                                className="object-cover size-full rounded-3xl w-20 h-20"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-1 inline-block bg-black rounded-full">
                                            <ArrowUp className="h-6 w-6 text-white" />
                                        </div>
                                        <h1 className="mt-4 text-sm">
                                            Choose files to drag and drop here
                                        </h1>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        {/* Form inputs for title, description, price, tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                placeholder="Add a title"
                                className="w-full border-4 border-gray-300  rounded-xl p-3 mt-1"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                placeholder="Add a detailed description, with relevant information and the condition of the item"
                                className="w-full border-4 border-gray-300 rounded-xl p-3 mt-1"
                                rows={4}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="text"
                                placeholder="Price"
                                className="w-full border-4 border-gray-300 rounded-xl p-3 mt-1"
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>

                        <Select onValueChange={(value) => setTags(value)}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select a tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Tag</SelectLabel>
                                    <SelectItem value="Textbooks">Textbooks</SelectItem>
                                    <SelectItem value="Tools/Equipment">Tools/Equipment</SelectItem>
                                    <SelectItem value="Furniture">Furniture</SelectItem>
                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                    <SelectItem value="Clothing">Clothing</SelectItem>
                                    <SelectItem value="School Supplies">School Supplies</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <button
                            className={"text-white font-semibold p-3 mb-10 rounded-full bg-red-600 cursor-pointer hover:bg-red-700 transition"}
                            onClick={handleCreatePost}>
                            Publish
                        </button>
                    </div>
                </aside>


                <div className="flex-1 ml-[25%] bg-[#f1f1f1] flex justify-center items-center overflow-hidden">
                    <div className=" bg-white p-5 rounded-xl shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]">
                        <div className="text-xl font-bold">Preview</div>
                        <div className="grid grid-cols-2 border-2 border-gray-100 rounded-2xl p-2 h-[95%] gap-x-2 mt-4">
                            <Carousel className="w-full max-w-md">
                                <CarouselContent>
                                    {imagePreviews.length > 0 ? (
                                        imagePreviews.map((preview, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <img src={preview} alt={`Preview ${index}`} className="object-cover w-full h-full rounded-3xl" />
                                                        </CardContent>
                                                    </Card>
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
                            <div>
                                <h1 className="text-3xl font-bold">{title}</h1>
                                <p className="font-light">${price}</p>
                                <p className="text-gray-600">Posted on 1/18/2025</p>
                                <div className="rounded-2xl w-fit p-3 bg-[#e9e9e9]">{tags}</div>

                                <p className="text-lg break-words mt-10">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
