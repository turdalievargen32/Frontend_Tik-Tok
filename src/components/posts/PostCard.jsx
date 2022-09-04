import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextProvider';
import { usePost } from '../../context/PostContextProvider';

const PostCard = ({ post }) => {
  const [like, SetLike] = useState(false);
  const [favorite, SetFavorite] = useState(false);
  const { addToFavorites, likePost } = usePost();

  const { followProfile } = useAuth();

  const navigate = useNavigate();

  function likeFunc() {
    if (!like) {
      console.log(like)
      likePost(post.id)
      SetLike(true)
    } else {
      console.log(like)
      likePost(post.id)
      SetLike(false)
    }
  }

  function favoriteFunc() {
    if (!favorite) {
      addToFavorites(post.id)
      console.log(favorite)
      SetFavorite(true)
    } else {
      addToFavorites(post.id)
      console.log(favorite)
      SetFavorite(false)
    }
  }

  const userPath = (id) => "/profile/"  + id



  return (
    <div className='post'>
      <div className='user-info'>
        <div className='user-info__head'>
          <Link to={userPath(post.user_id)}>
            <img src={post.user_image} alt="avatar" />
          </Link>
          <div>
            <Link to={userPath(post.user_id)}>
              <p className='user-name'>{post.user}</p>
            </Link>
            <p className='post-title'>{post.description}</p>
          </div>
        </div>
        <button onClick={() => followProfile(post.id)}>Follow</button>
      </div>
      <div className='post-info'>
        <video src={post.video} loop disablePictureInPicture controls>
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='post-actions'>
        <div>
          <button className="like" onClick={() => likeFunc()}>
            {
              like ?
                (
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="20px" height="20px" viewBox="0 0 1280.000000 1189.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)"
                      fill="red" stroke="none">
                      <path d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001 -2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360 634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346 -2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178 408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19 196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998 -193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417 -535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535 610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z" />
                    </g>
                  </svg>
                )
                :
                (
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="20px" height="20px" viewBox="0 0 1280.000000 1189.000000"
                    preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)"
                      fill="#000">
                      <path d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001 -2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360 634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346 -2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178 408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19 196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998 -193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417 -535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535 610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z" />
                    </g>
                  </svg>
                )
            }
          </button>
          <span>{post.post_likes}</span>
        </div>
        <div>
          <button className="comment" onClick={() => navigate(`/postdetail/${post.id}`)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><path d="M12,2C6.5,2,2,6.5,2,12c0,2.3,0.8,4.5,2.3,6.3l-2,2c-0.4,0.4-0.4,1,0,1.4C2.5,21.9,2.7,22,3,22h9c5.5,0,10-4.5,10-10S17.5,2,12,2z M8,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S8.6,13,8,13z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z M16,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S16.6,13,16,13z" /></svg>
          </button>
          <span>{post.comments.length}</span>
        </div>
        <div>
          <button onClick={() => favoriteFunc()}>
            {
              favorite ?
                (
                  <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill='yellow'></path></svg>
                )
                :
                (
                  <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill='black'></path></svg>
                )
            }
          </button>
          <span>{post.favorites}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;