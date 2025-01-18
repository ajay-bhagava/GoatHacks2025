"use client";

import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { getPostsForUser } from "@/lib/pocketbase"; // Assuming the function is in utils/api
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { ArrowDownUp } from "lucide-react";

export default function Content() {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("Date");
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    // Fetch posts on load
    const fetchPosts = async () => {
      const fetchedPosts = await getPostsForUser();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  // Handle sorting logic
  const handleSort = (key: string) => {
    if (sortOption === key) {
      setReverse(!reverse);
    } else {
      setSortOption(key);
      setReverse(false);
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const isReversed = reverse ? -1 : 1;
    if (sortOption === "Date") {
      return isReversed * (new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortOption === "Title") {
      return isReversed * a.title.localeCompare(b.title);
    } else if (sortOption === "Price") {
      return isReversed * (a.price - b.price);
    }
    return 0;
  });

  return (
    <div className="p-5">
      {/* Sort Dropdown */}
      <div className="flex justify-end mb-4">
        <Select value={sortOption} onValueChange={(value) => handleSort(value)}>
          <SelectTrigger className="w-40">
            <SelectValue>
              <span className="flex items-center">
                {sortOption}{" "}
                <ArrowDownUp
                  className={`ml-2 transition-transform ${
                    reverse ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectItem value="Date">Date</SelectItem>
          <SelectItem value="Title">Title</SelectItem>
          <SelectItem value="Price">Price</SelectItem>
        </Select>
      </div>

      {/* Posts Grid */}
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
    </div>
  );
}
