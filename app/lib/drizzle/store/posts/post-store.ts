import { getUserId } from "@/app/lib/jwt/session";
import { db } from "../..";
import { postsTable, usersTable } from "../../db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { Post } from "@/app/lib/types/core/post";
import { formatTimeAgo } from "@/app/lib/general/time-help";

export async function getPosts(category: string): Promise<Post[]> {
  const postsWithUsers = await db
    .select({
      id: postsTable.id,
      userId: postsTable.userId,
      content: postsTable.content,
      createdAt: postsTable.createdAt,
      likes: postsTable.likes,
      comments: postsTable.comments,
      shares: postsTable.shares,
      category: postsTable.category,
      user: {
        id: usersTable.id,
        username: usersTable.username,
      },
    })
    .from(postsTable)
    .where(eq(postsTable.category, category))
    .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
    .orderBy(asc(postsTable.createdAt));

  return postsWithUsers.map((post) => ({
    id: post.id,
    content: post.content,
    timeAgo: formatTimeAgo(new Date(post.createdAt)),
    likes: post.likes,
    comments: post.comments,
    shares: post.shares,
    liked: false,
    category: post.category,
    user: post.user || { id: 0, username: "Unknown" },
  }));
}

export async function createPost(
  content: string,
  category: string
): Promise<void> {
  const userId = await getUserId();
  const newPost: typeof postsTable.$inferInsert = {
    userId: userId!,
    content,
    category,
    createdAt: new Date().toISOString(),
  };
  console.log(newPost)

  await db.insert(postsTable).values(newPost);
}
