"use client";

import { useEffect, useState } from "react";
import { Post } from "@/app/lib/types/core/post";
import { PostCard } from "@/app/(components)/post-card/post-card-component";
import { PostInput } from "../post-input/post-input-component";
import { FilterButton } from "../filter-button/filter-button-component";
import Link from "next/link";

interface PostsListProps {
  category?: string;
}

export function PostsList({ category }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch(`/api/posts?category=${category ?? "general"}`);
    if (res.ok) setPosts(await res.json());
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const handlePostCreation = async () => {
    await fetchPosts();
  };

  const filterItems = [
    { label: "All", key: "" },
    { label: "Tech", key: "tech" },
    { label: "Gaming", key: "gaming" },
    { label: "General", key: "general" },
  ];
  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: number) => {
    console.log("Comment on post:", postId);
    // Implement comment functionality
  };

  const handleShare = (postId: number) => {
    console.log("Share post:", postId);
    // Implement share functionality
  };

  return (
    <>
      <div className="border-b border-white/10 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Home</h1>
      </div>

      <div className="py-4">
        <PostInput onPostCreation={handlePostCreation} />
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {filterItems.map((item) => (
          <Link
            key={item.key}
            href={item.key ? `/dashboard/home/${item.key}` : "/dashboard/home"}
          >
            <FilterButton
              label={item.label}
              selected={category === item.key || (!category && item.key === "")}
            />
          </Link>
        ))}
      </div>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-zinc-500 text-lg mb-2">No posts to show</div>
            <div className="text-zinc-600 text-sm">
              {category
                ? `No posts found in the ${category} category. Try a different category!`
                : "Try creating a new post!"}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
