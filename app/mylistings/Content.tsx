"use client";
import { useState, useEffect } from "react";
import pb, { getPostsForUser } from "@/lib/pocketbase";
import ItemCard from "./ItemCard";
import { RecordModel } from "pocketbase";

interface Post {
  id: string;
  image: string;
  price: number;
  title: string;
  location: string;
  tags?: string[];
  contact?: string;
  date?: string;
  imageURL: string; // Pre-resolved URL for the image
}

export default function Content() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts on load
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsForUser();

        // Resolve image URLs and construct post data
        const resolvedPosts = await Promise.all(
          fetchedPosts.map(async (post: RecordModel) => {
            const imageURL = pb.files.getURL(post, post.Images[0]); // Adjust this based on your data structure
            return {
              id: post.id,
              image: post.Images[0], // Adjust based on your data structure
              price: post.Price || 0,
              title: post.Title || "Untitled",
              location: post.location,
              tags: post.tags,
              contact: post.contact,
              date: post.date,
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
            />
          ))
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
