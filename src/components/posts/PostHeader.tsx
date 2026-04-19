"use client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { deletePost } from "@/actions/postAction";
import { toast } from "sonner";
interface IProps {
  authorName: string | null;
  authorUsername: string;
  postCreatedAt: Date;
  dbUserId: string | null;
  authorId: string;
  content: string | null;
  image: string | null;
  postId: string;
}

function PostHeader({
  authorName,
  authorUsername,
  dbUserId,
  authorId,
  content,
  image,
  postCreatedAt,
  postId,
}: IProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(postId);
      if (result?.success) toast.success("Post deleted successfully");
      else throw new Error(result?.error);
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between">
        <div className="flex flex-col truncate sm:flex-row sm:items-center sm:space-x-2">
          <Link
            href={`/profile/${authorUsername}`}
            className="truncate font-semibold"
          >
            {authorName}
          </Link>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href={`/profile/${authorUsername}`}>@{authorUsername}</Link>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(postCreatedAt))} ago</span>
          </div>
        </div>
        {/* Check if current user is the post author */}
        {dbUserId === authorId && (
          <DeleteAlertDialog
            isDeleting={isDeleting}
            onDelete={handleDeletePost}
          />
        )}
      </div>
      <p className="break-words border p-2 font-mono text-sm text-foreground">
        {content}
      </p>

      {image && (
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt="Post content"
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default PostHeader;
