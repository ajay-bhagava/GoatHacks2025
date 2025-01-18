"use client";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import pb from "../../lib/pocketbase";
import NavBar from "@/components/navbar";

const Page = () => {
    const [fileName, setFileName] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState("");

    // Handle file change to display image and file name
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setFileName(file.name);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreatePost = async () => {
        const currentUser = pb.authStore.model;

        if (!currentUser) {
            console.error("User is not authenticated.");
            window.location.href = "/";
            return;
        }

        let username = currentUser.username;
        if (username.startsWith("user")) {
            const email = currentUser.email;
            username = email.substring(0, email.indexOf("@"));
        }

        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("price", price);
        data.append("tags", tags);
        data.append("username", username);

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            data.append("images", file);
        }

        try {
            const record = await pb.collection("Post").create(data);

            if (record) {
                const userPosts = currentUser.posts || [];
                const updatedPosts = [...userPosts, record.id];

                const userData = {
                    posts: updatedPosts,
                };

                await pb.collection("users").update(currentUser.id, userData);
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.error("Error creating post:", error);
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
                    <div className="space-y-4">
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

                        {/* Form Inputs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                placeholder="Add a title"
                                className="w-full border-4 border-gray-300 rounded-xl p-3 mt-1"
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
                        <div>
                            <button
                                className="text-white font-semibold p-3 rounded-full bg-red-600"
                                onClick={handleCreatePost}
                            >
                                Publish
                            </button>
                        </div>
                    </div>
                    <br className={"mt-24"}/>
                </aside>

                <div className="flex-1 ml-[25%] bg-[#f1f1f1] flex justify-center items-center overflow-hidden">
                    <div className={"bg-white p-10 size-[90%] rounded-2xl shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]"}>
                        <div className={"text-xl font-bold"}>Preview</div>
                        <div className="grid grid-cols-[3fr_2fr] border-2 border-gray-100 rounded-2xl p-2 h-[95%]">
                            <div>image</div>
                            <div>
                                <h1 className="text-3xl font-bold">Title</h1>
                                <p className="font-light">$$$</p>
                                <p className="text-gray-600">Posted on 1/18/2025</p>
                                <p className="text-2xl font-bold">Description</p>
                                <p>Condition: New</p>
                                <div className="rounded-2xl w-fit p-3 bg-[#e9e9e9]">tags</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Page;
