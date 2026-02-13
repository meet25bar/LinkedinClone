"use client"


import React from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import ReactTimeago from "react-timeago"
import ProfilePhoto from "./Shared/ProfilePhoto"
import PostContent from "./PostContent"
import SocialOption from "./SocialOption"
import { deletePostAction } from "@/lib/serveraction"

// Loosened the prop type to avoid missing-field errors
interface PostProps { post: any }

const Post: React.FC<PostProps> = ({ post }) => {
  const { user } = useUser()
  const isOwner = user?.id === post.User.userId
  const fullName = `${post.User.firstName} ${post.User.lastName}`

  return (
    <div className="bg-white my-2 mx-2 rounded-lg border border-gray-300">
      <div className="flex gap-2 p-4">
        {/* ensure src is always string */}
        <ProfilePhoto src={post.User.Profilephoto ?? ""} />
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-xs font-bold">
              {fullName}
              {isOwner && <Badge variant="secondary" className="ml-2">you</Badge>}
            </h1>
            <p className="text-xs text-gray-500">
              @{post.User.userId ?? "user"}
            </p>
            <p className="text-xs text-gray-500">
              <ReactTimeago date={post.createdAt} />
            </p>
          </div>

          {isOwner && (
            <form action={deletePostAction}>
              <input
                type="hidden"
                name="postId"
                value={String(post._id)}
              />
              <Button
                type="submit"
                size="icon"
                variant="outline"
                className="rounded-full"
              >
                <Trash2 />
              </Button>
            </form>
          )}
        </div>
      </div>

      <PostContent post={post} />
      <SocialOption post={post} />
    </div>
  )
}

export default Post
