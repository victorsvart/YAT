import { createPost, getPosts } from "@/app/lib/drizzle/store/posts/post-store";
import {
  BadRequest as badRequest,
  Created as created,
} from "@/app/lib/http/helpers";
import { NewPost } from "@/app/lib/types/core/post";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return badRequest({ msg: "Missing category parameter", data: undefined });
  }

  const posts = await getPosts(category);
  return Response.json(posts);
}

export async function POST(req: Request): Promise<Response> {
  const newPost = (await req.json()) as NewPost;

  if (!newPost.category) {
    return badRequest({
      msg: "Missing category in request body",
      data: undefined,
    });
  }

  await createPost(newPost.content, newPost.category);
  return created({ msg: "Post created", data: undefined });
}
