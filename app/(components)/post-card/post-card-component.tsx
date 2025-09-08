import { Post } from "@/app/lib/types/core/post";
import { Heart, MessageCircle, MoreHorizontal, Share, User } from "lucide-react";

type Props = {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
};

export const PostCard = ({ post, onLike, onComment, onShare }: Props) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center h-12 w-12 rounded-full flex-shrink-0">
          <User size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{post.user.username}</h3>
              <span className="text-zinc-500 text-sm">
                @{post.user.username.toLowerCase().replace(" ", "")}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-500 text-sm">{post.timeAgo}</span>
            </div>
            <button className="text-zinc-500 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <p className="text-zinc-100 mt-3 text-lg leading-relaxed">
            {post.content}
          </p>
          {/* {post.image && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-64 object-cover"
              />
            </div>
          )} */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                post.liked
                  ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                  : "text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
              }`}
            >
              <Heart size={16} fill={post.liked ? "currentColor" : "none"} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button
              onClick={() => onComment(post.id)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-zinc-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300"
            >
              <MessageCircle size={16} />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button
              onClick={() => onShare(post.id)}
              className="flex items-center space-x-2 px-3 py-2 rounded-full text-zinc-500 hover:text-green-500 hover:bg-green-500/10 transition-all duration-300"
            >
              <Share size={16} />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
