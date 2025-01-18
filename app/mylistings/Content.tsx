"use client";

import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { getPostsForUser, loginUser } from "@/lib/pocketbase"; // Adjust to your actual path
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { ArrowDownUp } from "lucide-react";
    

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("Date");
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    // Fetch posts on load
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsForUser();
        console.log(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle sorting logic
//   const sortedPosts = [...posts].sort((a, b) => {
//     const isReversed = reverse ? -1 : 1;
//     if (sortOption === "Date") {
//       return isReversed * (new Date(a.date).getTime() - new Date(b.date).getTime());
//     } else if (sortOption === "Title") {
//       return isReversed * a.title.localeCompare(b.title);
//     } else if (sortOption === "Price") {
//       return isReversed * (a.price - b.price);
//     }
//     return 0;
//   });

  return (
    <div className="p-5">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">My Listings</div>
        <div className="flex items-center gap-2">
          {/* ArrowDownUp for reversing sort order */}
          <ArrowDownUp
            className={`w-5 h-5 cursor-pointer transition-transform ${
              reverse ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setReverse(!reverse)}
          />
          {/* Sort Dropdown */}
          <Select value={sortOption} onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-40">
              <SelectValue>{sortOption}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Date">Date</SelectItem>
              <SelectItem value="Title">Title</SelectItem>
              <SelectItem value="Price">Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Posts Grid or Fallback */}
      {/* {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedPosts.map((post) => (
            <ItemCard
              key={post.id}
              price={post.price}
              title={post.title}
              location={post.location}
              tags={post.tags}
              contact={post.contact}
              date={post.date}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <p className="text-gray-600 text-lg">You don't have any listings right now.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create a Listing
          </button>
        </div>
      )} */}
    </div>
  );
}
