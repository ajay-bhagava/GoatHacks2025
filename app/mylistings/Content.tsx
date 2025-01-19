"use client";

import { useState, useEffect } from "react";
import pb, { getPostsForUser } from "@/lib/pocketbase";
import ItemCard from "./ItemCard";
import { RecordModel } from "pocketbase";
import { ArrowUpDown } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/select";
import { motion, AnimatePresence } from "framer-motion";

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

import {useRouter} from "next/navigation"

export default function Content() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<string>("Date");
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const router = useRouter()

  if (!pb.authStore.isValid) {
	  router.push("/login")
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsForUser();

        const resolvedPosts = await Promise.all(
          fetchedPosts.map(async (post: RecordModel) => {
            const imageURLs = post.Images.map((image: string) =>
              pb.files.getURL(post, image)
            );
            return {
              id: post.id,
              image: post.Images,
              tags: post.Tags,
              price: post.Price || 0,
              title: post.Title || "Untitled",
              location: post.location,
              contact: post.contact,
              date: post.date,
              description: post.Description,
              imageURLs,
            };
          })
        );

        setPosts(resolvedPosts);
      } catch (error) {
        //console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

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

  const sortedPosts = sortPosts(posts);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">My Listings</h1>
        <div className="flex items-center gap-2">
          <ArrowUpDown
            className="w-12 h-12 cursor-pointer"
            onClick={() => setSortOrder(!sortOrder)}
          />
          <span className="font-semibold whitespace-nowrap">Sort by</span>
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
      </div>
    
      <div className="grid grid-cols-4 gap-4">
        <AnimatePresence>
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ItemCard
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
