"use client";
import { useState, useEffect } from "react";
import pb, { getPostsForUser } from "@/lib/pocketbase";
import ItemCard from "./ItemCard";
import { RecordModel } from "pocketbase";

interface Post {
  id: string;
  description: string;
  image: string;
  price: number;
  title: string;
  location: string;
  tags?: string[];
  contact?: string;
  date?: string;
  imageURL: string;
}

export default function Content() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsForUser(abortController.signal);
  
        const resolvedPosts = await Promise.all(
          fetchedPosts.map(async (post: RecordModel) => {
            const imageURL = pb.files.getURL(post, post.Images[0]);
            return {
              id: post.id,
              image: post.Images[0],
              price: post.Price || 0,
              title: post.Title || "Untitled",
              location: post.location,
              tags: post.tags,
              contact: post.contact,
              date: post.date,
              description: post.Description,
              imageURL,
            };
          })
        );
  
        setPosts(resolvedPosts);
      } catch (error: any) {
        // Suppress the specific "autocancelled" error
        if (
          error instanceof Error &&
          error.name === "ClientResponseError" &&
          error.message === "The request was autocancelled."
        ) {
          console.log("Request was cancelled, no action needed.");
          return;
        }
      }
    };
  
    fetchPosts();
  
    // Cleanup function to abort the request on component unmount
    return () => {
      abortController.abort();
    };
  }, []);
  

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold">My Listings</h1>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-4 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ItemCard
              key={post.id}
              image={post.image}
              price={post.price}
              title={post.title}
              location={post.location}
              tags={post.tags}
              contact={post.contact}
              date={post.date}
              imageURL={post.imageURL}
              description={post.description}
            />
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
