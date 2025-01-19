"use client";
import { useState, useEffect } from "react";
import pb, { getPostsForUser } from "@/lib/pocketbase";
import ItemCard from "./ItemCard";
import { RecordModel } from "pocketbase";

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPostsForUser();

        const resolvedPosts = await Promise.all(
            fetchedPosts.map(async (post: RecordModel) => {
              const imageURLs = post.Images.map((image: string) => pb.files.getURL(post,image));
              //const imageURL = pb.files.getURL(post, post.Images[]);
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
                  contact={post.contact}
                  date={post.date}
                  tags={post.tags}
                  imageURLs={post.imageURLs}
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
