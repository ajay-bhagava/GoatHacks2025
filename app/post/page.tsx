"use client";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { createPost, loginUser } from "../../lib/pocketbase";

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
            console.error("Error creating post:", error);
        }
    };

    return (
        <div>
            <div className={"flex"}>
                <aside className={"p-4 w-1/4 h-full shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]"}>
                    <div className={"space-y-4"}>
                        <div className="flex">
                            <div
                                className={
                                    "p-4 rounded-3xl text-center bg-[#e9e9e9] size-36 flex flex-col justify-center items-center relative"
                                }
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Uploaded"
                                        className="object-cover size-full rounded-3xl"
                                    />
                                ) : (
                                    <>
                                        <div className={"p-1 inline-block bg-black rounded-full"}>
                                            <ArrowUp className={"h-6 w-6 text-white"} />
                                        </div>
                                        <h1 className={"mt-4 text-sm"}>
                                            Choose a file to drag and drop <br /> it here
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

                        <button className={"text-white font-semibold p-3 rounded-full bg-red-600"} onClick={handleCreatePost}>
                            Publish
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Page;
