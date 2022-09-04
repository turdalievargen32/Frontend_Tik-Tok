import React from 'react';
import SideBar from '../components/SideBar';
import FavoritePosts from '../components/posts/FavoritePosts';
import "../styles/FavoritesPage.css"



const FavoritesPage = () => {
  return (
    <div className='main'>
      <div className="position-sidebar__1">
        <div className="position-sidebar__2">
          <div className="position-sidebar__3">
            <div className="position-sidebar__4">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
      <div className='scrollbar'>
        <h2 className='header-fav'>Favorites</h2>
        <FavoritePosts />
      </div>
    </div>
  );
};

export default FavoritesPage;