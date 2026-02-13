// ✅ SocialOption.tsx
'use client';

import { Button } from '@/components/ui/button';
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import { MessageCircleCode, Repeat, Send, ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const SocialOption = ({ post }: { post: IPostDocument }) => {
  const { user } = useUser();
  const [likes, setLikes] = useState<string[]>(post.likes || []);
  const [mounted, setMounted] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState(post.comments || []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return null;

  const userId = user.id;
  const isAlreadyLiked = likes.includes(userId);

  const handleLikeToggle = async () => {
    const optimisticLikes = isAlreadyLiked
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(optimisticLikes);

    try {
      const res = await fetch(`/api/posts/${post._id}/${isAlreadyLiked ? 'dislike' : 'like'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error('Failed to update like');
    } catch (error) {
      console.error(error);
      setLikes(likes); // rollback
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    const commentPayload = {
      textMessage: comment,
      user: {
        userId: user.id,
        Profilephoto: user.imageUrl,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      },
    };

    try {
      const res = await fetch(`/api/posts/${post._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentPayload),
      });

      if (!res.ok) throw new Error('Failed to post comment');

      const data = await res.json();
      setPostComments((prev) => [...prev, data.comment]);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='text-sm mx-2 p-2 border-b border-gray-300'>
        {likes.length > 0 && (
          <p className='text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer'>
            {likes.length} Like{likes.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className='flex items-center gap-2 mx-2 my-2'>
        <MotionButton
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleLikeToggle}
          variant='ghost'
          className={`flex items-center gap-1 transition-colors ${
            isAlreadyLiked ? 'text-blue-600' : 'text-gray-600 hover:text-black'
          }`}
        >
          <ThumbsUp
            className='w-4 h-4'
            fill={isAlreadyLiked ? '#3b82f6' : 'none'}
            stroke={isAlreadyLiked ? '#3b82f6' : 'currentColor'}
          />
          <p>{isAlreadyLiked ? 'Liked' : 'Like'}</p>
        </MotionButton>

        <Button
          onClick={() => setCommentOpen(!commentOpen)}
          variant='ghost'
          className='flex items-center gap-1 text-gray-600 hover:text-black'
        >
          <MessageCircleCode />
          <p>Comment</p>
        </Button>

        <Button variant='ghost' className='flex items-center gap-1 text-gray-600 hover:text-black'>
          <Repeat />
          <p>Repost</p>
        </Button>

        <Button variant='ghost' className='flex items-center gap-1 text-gray-600 hover:text-black'>
          <Send />
          <p>Share</p>
        </Button>
      </div>

      {commentOpen && (
        <div className='px-4 py-2 space-y-3'>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write a comment...'
            className='w-full p-2 border border-gray-300 rounded resize-none text-sm focus:outline-none focus:ring-1 focus:ring-blue-500'
            rows={3}
          />
          <button
            onClick={handleCommentSubmit}
            className='mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Post Comment
          </button>

          {postComments.length > 0 ? (
            <div className='mt-4 space-y-2'>
              {postComments.map((commentObj, index) => (
                <div key={index} className='text-sm bg-gray-100 p-2 rounded'>
                  <div className='font-medium'>
                    {commentObj.user.firstName} {commentObj.user.lastName}
                  </div>
                  <div className='text-gray-700'>{commentObj.textMessage}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-500 mt-2'>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialOption;
