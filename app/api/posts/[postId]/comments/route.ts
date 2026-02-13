import connectDB from "@/lib/db";
import { Post } from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }  // ← note Promise<…>
) {
  try {
    await connectDB();

    // await the Promise to get your actual params object
    const { postId } = await params;

    const post = await Post.findById(postId).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post.comments, { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json({ error: "Error occurred" }, { status: 500 });
  }
}
