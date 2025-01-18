"use client";
import { ArrowUp } from "lucide-react";
import pb from "../../lib/pocketbase";
import NavBar from "@/components/navbar";
import { useState, useEffect } from "react";
import { createPost, loginUser } from "@/lib/pocketbase";

const Page = () => {
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const filesArray = Array.from(event.target.files);
            setSelectedImages(filesArray);
            setFileName(filesArray[0].name);
            setImagePreview(URL.createObjectURL(filesArray[0]));
        }
    };

    // Login and set up user session
    useEffect(() => {
        const login = async () => {
            try {
                await loginUser("ajay.bhagava@gmail.com", "12345678");
            } catch (error) {
                console.error("Login failed", error);
            }
        };
        login();
    }, []);

    // Handle post creation
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
                <NavBar/>
            </div>

            {/* Main Layout */}
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
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded"
                                        className="object-cover size-full rounded-3xl"
                                    />
                                ) : (
                                    <>
                                        <div className="p-1 inline-block bg-black rounded-full">
                                            <ArrowUp className="h-6 w-6 text-white"/>
                                        </div>
                                        <h1 className="mt-4 text-sm">
                                            Choose a file to drag and drop <br/> it here
                                        </h1>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tags</label>
                            <input
                                type="text"
                                placeholder="Add a tag"
                                className="w-full border-4 border-gray-300 rounded-xl p-3 mt-1"
                                onChange={(event) => setTags(event.target.value)}
                            />
                        </div>

                        <button
                            className={"text-white font-semibold p-3 mb-10 rounded-full bg-red-600 cursor-pointer hover:bg-red-700 transition"}
                            onClick={handleCreatePost}>
                            Publish
                        </button>
                    </div>

                </aside>

                <div className="flex-1 ml-[25%] bg-[#f1f1f1] flex justify-center items-center overflow-hidden">
                    <div className={"bg-white p-10 size-[90%] rounded-2xl shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]"}>
                        <div className={"text-xl font-bold"}>Preview</div>
                        <div className="grid grid-cols-2 border-2 border-gray-100 rounded-2xl p-2 h-[95%] gap-x-2">
                            {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded"
                                        className="size-fit rounded-2xl max-w-full max-h-[87.5%] object-cover"
                                    />
                            ) : (
                                <div className="bg-[#e9e9e9] rounded-2xl w-full h-full"></div>
                            )}
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
}

export default Page;
