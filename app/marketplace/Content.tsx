import {Armchair, BookText, NotebookPen, Plug, Search, Shirt, ShoppingBasket, Store, Tag, Wrench} from "lucide-react";
import ItemCard from "@/app/marketplace/ItemCard";
import Link from "next/link";

export default function Content() {
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
                <ItemCard location={"Off-Campus Apartment"} price={120} title={"Scandinavian Bench"} description={"Great bench, i sat on it so many times."}/>
            </div>
        </div>
    )
}