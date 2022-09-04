import React, { useEffect, useState } from 'react';
import FavoritePostCard from './FavoritePostCard';
import { usePost } from '../../context/PostContextProvider';

const PostList = () => {

  const { getFavoritePosts, favoritePosts } = usePost();

  useEffect(() => {
    getFavoritePosts();
  }, [])

  console.log(favoritePosts)

  return (
    <div className='post-list'>
      {
        favoritePosts?.length ?
          favoritePosts.map((post, index) => (
            <FavoritePostCard post={post} key={index} />
          ))
          :
          <>
            <h3 style={{marginTop: '30px'}}>Loading...</h3>
            <h3 style={{marginTop: '30px'}}>or there is no videos</h3>
          </>
      }
    </div>
  );
};

export default PostList;