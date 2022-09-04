import React from 'react';
import PostList from '../components/posts/PostList';
import "../styles/HomePage.css"
import SideBar from '../components/SideBar';

const HomePage = () => {

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
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;