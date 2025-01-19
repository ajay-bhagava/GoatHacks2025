"use client";

import {
    Armchair,
    BookText,
    NotebookPen,
    Plug,
    Search,
    Shirt,
    ShoppingBasket,
    Store,
    Tag,
    Wrench,
    ArrowUpDown,
} from "lucide-react";
import ItemCard from "@/app/marketplace/ItemCard";
import Link from "next/link";
import { RecordModel } from "pocketbase";
import pb, { getPosts } from "@/lib/pocketbase";
import { useEffect, useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/select";
import { AnimatePresence, motion } from "framer-motion";

interface Post {
    id: string;
    description: string;
    image: string[];
    price: number;
    title: string;
    location: string;
    contact?: string;
    date?: string;
    imageURLs: string[];
    tags: string;
}

export default function Content() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("Date");
    const [sortOrder, setSortOrder] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();

                const resolvedPosts = await Promise.all(
                    fetchedPosts.map(async (post: RecordModel) => {
                        const imageURLs = post.Images.map((image: string) => pb.files.getURL(post, image)) || "bench.jpg";
                        return {
                            id: post.id,
                            image: post.Images,
                            tags: post.Tags,
                            price: post.Price || 0,
                            title: post.Title || "Untitled",
                            location: post.location,
                            contact: post.expand?.Account?.email,
                            date: post.date,
                            description: post.Description,
                            imageURLs,
                        };
                    })
                );
                setPosts(resolvedPosts);
                console.log(resolvedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const sortPosts = (posts: Post[]) => {
        const sortedPosts = [...posts];
        switch (sortBy) {
            case "Title":
                sortedPosts.sort((a, b) =>
                    a.title.localeCompare(b.title) * (sortOrder ? 1 : -1)
                );
                break;
            case "Price":
                sortedPosts.sort((a, b) => (a.price - b.price) * (sortOrder ? 1 : -1));
                break;
            case "Date":
            default:
                sortedPosts.sort((a, b) =>
                    new Date(a.date || "").getTime() -
                    new Date(b.date || "").getTime()
                );
                if (!sortOrder) sortedPosts.reverse();
                break;
        }
        return sortedPosts;
    };

    const filteredPosts = posts
        .filter((post) => {
            const matchesCategory = selectedCategory
                ? post.tags.toLowerCase().includes(selectedCategory.toLowerCase())
                : true;
            const matchesSearch = searchQuery
                ? post.title.toLowerCase().includes(searchQuery)
                : true;
            return matchesCategory && matchesSearch;
        });

    const sortedFilteredPosts = sortPosts(filteredPosts);

    return (
        <div className={"flex"}>
            <aside className={"p-4 w-1/4 h-screen shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]"}>
                <form
                    className="my-3 mb-6 hidden lg:flex items-center bg-[#f1f1f1] rounded-full px-4 py-2 w-full max-w-xl hover:bg-gray-200 transition"
                    onSubmit={handleSearchSubmit}
                >
                    <Search
                        className="text-gray-500 w-5 h-5 cursor-pointer"
                        onClick={handleSearchSubmit}
                    />
                    <input
                        type="text"
                        placeholder="Search items"
                        className="bg-transparent ml-2 w-full outline-none text-gray-700"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </form>

                <div className="flex items-center gap-2 mb-6">
                    <ArrowUpDown
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => setSortOrder(!sortOrder)}
                    />
                    <span className="font-semibold">Sort by</span>
                    <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value)}
                    >
                        <SelectTrigger className="w-full max-w-[150px]">
                            <SelectValue placeholder="Select sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Date">Date</SelectItem>
                            <SelectItem value="Title">Title</SelectItem>
                            <SelectItem value="Price">Price</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className={"flex gap-x-3 py-2 items-center hover:bg-gray-100 transition cursor-pointer"}>
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <ShoppingBasket className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Buying</h1>
                    </div>
                    <Link href={"/mylistings"}>
                        <div className={"flex gap-x-3 py-2 mb-3 items-center hover:bg-gray-100 transition"}>
                            <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                                <Tag className={"w-5 h-5 "} />
                            </div>
                            <h1 className={"font-semibold"}>Selling</h1>
                        </div>
                    </Link>
                </div>

                <hr className={"mb-3"} />

                <div>
                    <h1 className={"font-semibold mb-3"}>Categories</h1>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory(null)}
                    >
                        <div className={"ml-2 cursor-pointer bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Store className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Browse All Items</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("textbooks")}
                    >
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <BookText className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Textbooks</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("tools")}
                    >
                        <div className={" ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Wrench className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Tools/Equipment</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("furniture")}
                    >
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Armchair className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Furniture</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("electronics")}
                    >
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Plug className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Electronics</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("clothing")}
                    >
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <Shirt className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>Clothing</h1>
                    </div>
                    <div
                        className={"flex cursor-pointer gap-x-3 py-2 items-center hover:bg-gray-100 transition"}
                        onClick={() => setSelectedCategory("school supplies")}
                    >
                        <div className={"ml-2 bg-[#f1f1f1] hover:bg-gray-200 transition p-2 rounded-full"}>
                            <NotebookPen className={"w-5 h-5 "} />
                        </div>
                        <h1 className={"font-semibold"}>School Supplies</h1>
                    </div>
                </div>
            </aside>

            <div className={"grid grid-cols-4 bg-[#f2f2f2] gap-4 p-6 w-full"}>
                <AnimatePresence>
                    {sortedFilteredPosts.length > 0 ? (
                        sortedFilteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ItemCard
                                    key={post.id}
                                    price={post.price}
                                    title={post.title}
                                    location={post.location}
                                    contact={post.contact}
                                    date={post.date}
                                    tags={post.tags}
                                    imageURLs={post.imageURLs}
                                    description={post.description}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-500">No posts found.</p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
