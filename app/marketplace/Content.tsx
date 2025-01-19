"use client";

import {Armchair, BookText, NotebookPen, Plug, Search, Shirt, ShoppingBasket, Store, Tag, Wrench} from "lucide-react";
import ItemCard from "@/app/marketplace/ItemCard";
import Link from "next/link";
import { RecordModel } from "pocketbase";
import pb, { getPostsForUser } from "@/lib/pocketbase";
import {useEffect, useState} from "react";


interface Post {
    id: string;
    description: string;
    image: string;
    price: number;
    title: string;
    location: string;
    contact?: string;
    date?: string;
    imageURL: string;
    tags: string;
}


export default function Content() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPostsForUser();

                const resolvedPosts = await Promise.all(
                    fetchedPosts.map(async (post: RecordModel) => {
                        const imageURL = pb.files.getURL(post, post.Images[0]);
                        return {
                            id: post.id,
                            image: post.Images[0],
                            tags: post.tag,
                            price: post.Price || 0,
                            title: post.Title || "Untitled",
                            location: post.location,
                            contact: post.contact,
                            date: post.date,
                            description: post.Description,
                            imageURL,
                        };
                    })
                );
                console.log(resolvedPosts);

                setPosts(resolvedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts().then();
    }, []);
    return(
        <div className={"flex"}>
            <aside className={"p-4 w-1/4 h-screen shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]"}>
                {/*Searchbar*/}
                <div
                    className="my-3 mb-6 hidden lg:flex items-center bg-[#f1f1f1] rounded-full px-4 py-2 w-full max-w-xl hover:bg-gray-200 transition">
                    <Search className="text-gray-500 w-5 h-5"/>
                    <input
                        type="text"
                        placeholder="Search items"
                        className="bg-transparent ml-2 w-full outline-none text-gray-700"
                    />
                </div>

                {/* Options */}
                <div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <ShoppingBasket className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Buying</h1>
                    </div>
                    <Link href={"/mylistings"}>
                        <div className={"flex gap-x-3 py-2 mb-3 items-center hover:bg-gray-100 transition"}>
                            <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                                <Tag className={"w-5 h-5 "}/>
                            </div>
                            <h1 className={"font-semibold"}>Selling</h1>
                        </div>
                    </Link>

                </div>

                <hr className={"mb-3"}/>

                {/* Categories */}
                <div className={""}>
                    <h1 className={"font-semibold mb-3"}>Categories</h1>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Store className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Browse All Items</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <BookText className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Textbooks</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Wrench className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Tools/Equipment</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Armchair className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Furniture</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Plug className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Electronics</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Shirt className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>Clothing</h1>
                    </div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition"}>
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <NotebookPen className={"w-5 h-5 "}/>
                        </div>
                        <h1 className={"font-semibold"}>School Supplies</h1>
                    </div>
                </div>
            </aside>

            <div className={"grid grid-cols-4 bg-[#f2f2f2] gap-4  p-6 w-full "}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <ItemCard
                            key={post.id}
                            image={post.image}
                            price={post.price}
                            title={post.title}
                            location={post.location}
                            contact={post.contact}
                            date={post.date}
                            tags={post.tags}
                            imageURL={post.imageURL}
                            description={post.description}
                        />
                    ))
                ) : (
                    <p className="text-gray-500">No posts found.</p>
                )}            </div>
        </div>
    )
}