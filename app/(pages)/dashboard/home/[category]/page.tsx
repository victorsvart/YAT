import { Post } from "@/app/lib/types/core/post";
import { PostsList } from "@/app/(components)/post-list/post-list-component";

interface HomePageProps {
  params: { category?: string };
}

export default async function HomePage({ params }: HomePageProps) {
  const data = await params;
  const selectedCategory = data.category;

  return (
    <div className="min-h-screen w-full flex justify-center items-start p-6">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg">
        <PostsList category={selectedCategory} />
      </div>
    </div>
  );
}
