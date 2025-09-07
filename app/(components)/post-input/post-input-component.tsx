import { User } from "lucide-react";

export const PostInput = (): React.ReactElement => {
  return (
    <form className="flex flex-col w-full h-auto bg-zinc-800 p-5 rounded-3xl shadow-lg space-y-4">
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="flex items-center bg-zinc-700 text-zinc-400 justify-center transition-all h-12 w-12 rounded-full cursor-pointer group hover:bg-zinc-600 flex-shrink-0">
          <User />
        </div>
        {/* Input Section */}
        <input
          type="text"
          className="flex-1 h-24 bg-zinc-900 text-zinc-100 placeholder-zinc-400 rounded-2xl px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-zinc-500 transition-all"
          placeholder="What are you thinking?"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
          Post
        </button>
      </div>
    </form>
  );
};
