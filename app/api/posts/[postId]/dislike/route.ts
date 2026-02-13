import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }    // ← params is a Promise
) {
  try {
    await connectDB();

    // resolve the params promise
    const { postId } = await params;

    // assume client is sending { userId: "…" }
    const { userId } = await req.json();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    await post.updateOne({ $pull: { likes: userId } });
    return NextResponse.json({ message: "Disliked." }, { status: 200 });
  } catch (error) {
    console.error("Error in dislike route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
