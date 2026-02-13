'use client';

import React from 'react';
import ProfilePhoto from './Shared/ProfilePhoto';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createCommentAction } from '@/lib/serveraction';

const CommentInput = ({ postId }: { postId: string }) => {
  const { user } = useUser();

  const commentActionHandler = async (formData: FormData) => {
    try {
      if (!user) throw new Error('User not authenticated');

      console.log('Submitting comment to post ID:', postId);

      await createCommentAction(postId, formData);

    } catch (error) {
      console.error('💥 Comment Submission Failed:', error);
      throw error; // This will still cause a UI error unless caught
    }
  };

  if (!user) return null;

  return (
    <form action={commentActionHandler}>
      <div className='flex items-center gap-2'>
        <ProfilePhoto src={user.imageUrl} />
        <Input
          type='text'
          name='inputText' // ✅ Fix: Ensure it matches backend FormData key
          placeholder='Add a comment...'
          className='rounded-full'
          required
        />
        <Button type='submit' variant='outline' className='rounded-full'>
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
