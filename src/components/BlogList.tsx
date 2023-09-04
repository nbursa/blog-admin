import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk } from '../store/blog/blogActions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { BlogListProps, BlogPost, MarkdownWithImageProps } from '../types';

const BlogList: React.FC<BlogListProps> = ({ onClick }) => {
  const dispatch: ThunkDispatch<never, undefined, AnyAction> = useDispatch();
  const posts: BlogPost[] = useSelector((state: RootState) => state.blog.posts);

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  if (!posts) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        No posts found! Create new post!
      </div>
    );
  }

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.updatedAt as Date).getTime();
    const dateB = new Date(b.updatedAt as Date).getTime();
    return dateB - dateA;
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (typeof onClick === 'function') {
      onClick(id);
    } else {
      console.log('No callback for id: ', typeof id, id);
    }
  };

  const MarkdownWithImage: React.FC<MarkdownWithImageProps> = ({ content }) => {
    const imageMatch = content.match(/!\[.*\]\((.*?)\)/);
    const imageUrl = imageMatch && imageMatch[1];

    const headingMatch = content.match(/^# (.*)/m);
    const headingText = headingMatch && headingMatch[1];

    return (
      <div className='w-full '>
        {imageUrl && <img src={imageUrl} alt='Markdown' />}
        {headingText && (
          <h2 className='py-4 text-xl font-poppins font-bold'>{headingText}</h2>
        )}
      </div>
    );
  };

  return (
    <div className='w-full mx-auto p-4'>
      <h2 className='font-poppins font-bold text-center text-4xl mt-12 mb-1'>
        Blog List
      </h2>
      <small className='block text-center text-xs mb-12'>
        {new Date().toLocaleDateString()}{' '}
        {new Date().toLocaleTimeString('eu', {
          timeStyle: 'short',
        })}
      </small>
      <div
        className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:max-w-4xl xl:max-w-7xl mx-auto'
        style={{ gridTemplateRows: 'masonry' }}
      >
        {sortedPosts.map(post => {
          return (
            <div
              key={post._id}
              className='h-auto border border-gray-light rounded p-4 pb-2 cursor-pointer flex flex-col justify-between hover:shadow-md hover:shadow-white transition-shadow duration-300 hover:scale-[102%]'
              onClick={e => handleClick(e, post._id as string)}
            >
              <div className='mb-4'>
                <small className='text-gray-500 text-xs text-right flex items-center justify-between mb-2'>
                  <span>
                    {new Date(post.updatedAt as Date).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(post.updatedAt as Date).toLocaleTimeString('eu', {
                      timeStyle: 'short',
                    })}
                  </span>
                </small>
                <h3 className='text-base font-bold mb-4'>{post.title}</h3>
                <div className='text-sm overflow-hidden break-words'>
                  {<MarkdownWithImage content={post.content} />}
                </div>
              </div>

              <small className='text-gray-500 text-xs'>
                Created:
                <div className='flex items-center justify-between'>
                  <span>
                    {new Date(post.createdAt as Date).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(post.createdAt as Date).toLocaleTimeString('eu', {
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
