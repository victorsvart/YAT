"use client";
import { User, Image, Smile, Calendar } from "lucide-react";
import { useState } from "react";

type PostInputProps = {
  onPostCreation: () => void;
};

export const PostInput = ({ onPostCreation }: PostInputProps): React.ReactElement => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      createPost(content, "general");
      setContent("");
      setIsExpanded(false);
    }
  };

  async function createPost(
    content: string,
    category: string | undefined
  ): Promise<void> {
    if (!category) {
      console.error("Error: category is undefined");
      return;
    }
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content, category }),
      });

      if (!response.ok) {
        const json = await response.json();
        console.error("Failed to create post:", json);
      }

      onPostCreation();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <div className="flex space-x-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center h-12 w-12 rounded-full flex-shrink-0">
          <User size={20} />
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-lg resize-none outline-none"
            rows={isExpanded ? 3 : 1}
          />
          {isExpanded && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
              <div className="flex space-x-3">
                <button className="text-zinc-500 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-zinc-800">
                  <Image size={20} />
                </button>
                <button className="text-zinc-500 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-zinc-800">
                  <Smile size={20} />
                </button>
                <button className="text-zinc-500 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-zinc-800">
                  <Calendar size={20} />
                </button>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
