import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import "../styles/postDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import CommentCard from '../components/follow/CommentCard';
import { useAuth } from '../context/AuthContextProvider';
import { usePost } from '../context/PostContextProvider';

const PostDetailsPage = () => {

  const [addCommentBtn, setAddCommentBtn] = useState("#9F9B95");

  const [comment, setComment] = useState({
    body: "",
  })


  const navigate = useNavigate();


  const [current_profile, setCurrent_profile] = useState({});

  const { users } = useAuth();
  const { posts, addComment } = usePost();

  const { id } = useParams();



  useEffect(() => {
    getUser()
  }, [users])

  const getUser = () => { // user profile id\
    users.forEach((user) => {
      if (user.id == id) {
        setCurrent_profile(user)
      }
    })
  }

  const handleInp = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
    console.log(comment.body)
  }
  console.log(posts)

  function dataReceive() {
    let post = posts.filter(e => (e.id == id))
    return post[0];
  }

  const post = dataReceive()
  console.log(post)


  const handleComment = () => {
    console.log(comment.body)
    console.log(post.id)
    let newComment = new FormData();
    newComment.append("body", comment.body);
    newComment.append("post", post.id);
    addComment(newComment)
  }



  function FuncSendBtn(e) {
    // (e == "") ? 
    if (e) {
      setAddCommentBtn("#FE2C55");
    } else {
      setAddCommentBtn("#9F9B95")
    }
  }

  return (
    <div style={{ display: "flex", marginTop: "60px" }} className="postDetailsPage__main">
      <div className="container">
        <div className="position-sidebar__1">
          <div className="position-sidebar__2">
            <div className="position-sidebar__3">
              <div className="position-sidebar__4">
                <SideBar />
              </div>
            </div>
          </div>
        </div>
        <div className='postDetailsPage'>
          <div className="postDetail__header">
            <a onClick={() => navigate("/profile")}>
              <div className="postDetail__header_avatar">
                <img src={post.user_image} alt="" />
              </div>
              <div className="postDetail_username">
                {post.user}
              </div>
            </a>
            <div className="postDetail__descr">
              {post.description}
            </div>
          </div>
          <div className="postDetail__top">
            <video src={post.video} controls>Your browser does not support the video tag.</video>
            <div className="postDetail__back-btn" onClick={() => navigate(-1)}>
              <svg width="25" height="25" viewBox="0 0 48 48" fill="#FFF" xmlns="http://www.w3.org/2000/svg" style={{ transform: "rotate(180deg)" }}><path fillRule="evenodd" clipRule="evenodd" d="M34.4142 22.5858L18.1213 6.29289C17.7308 5.90237 17.0976 5.90237 16.7071 6.29289L15.2929 7.70711C14.9024 8.09763 14.9024 8.7308 15.2929 9.12132L30.1716 24L15.2929 38.8787C14.9024 39.2692 14.9024 39.9024 15.2929 40.2929L16.7071 41.7071C17.0976 42.0976 17.7308 42.0976 18.1213 41.7071L34.4142 25.4142C35.1953 24.6332 35.1953 23.3668 34.4142 22.5858Z"></path></svg>
            </div>
          </div>
          <div className="postDetail__comments">
            {
              post.comments.map(e => (
                <CommentCard comment={e} />
              ))
            }
          </div>
          <div className="postDetail__bottom">
            <div className="postDetail__info-block">
              <div className="comment-block__send-block">
                <div className="comment-block__send_input__block">
                  <input type="text" placeholder='Add comment...' name='body' onChange={(e) => (
                    handleInp(e),
                    FuncSendBtn(e.target.value)
                  )} />
                  <button style={{ color: addCommentBtn }} onClick={() => handleComment()}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
{/* <button class="like">
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 1280.000000 1189.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,1189.000000) scale(0.100000,-0.100000)" fill="#000"><path d="M3250 11884 c-25 -2 -106 -11 -180 -20 -1485 -172 -2704 -1295 -3001 -2764 -133 -660 -67 -1507 171 -2223 252 -753 675 -1411 1397 -2172 342 -360 634 -630 1588 -1470 231 -203 488 -430 570 -505 1024 -920 1735 -1692 2346 -2547 l130 -183 132 0 132 1 130 192 c557 822 1212 1560 2185 2461 191 178 408 373 1027 923 956 852 1445 1343 1841 1850 643 825 968 1603 1064 2553 19 196 17 665 -5 835 -105 805 -441 1497 -998 2054 -557 557 -1250 894 -2054 998 -193 24 -613 24 -810 0 -733 -93 -1379 -387 -1920 -874 -191 -172 -406 -417 -535 -610 -30 -45 -57 -82 -60 -82 -3 0 -30 37 -60 82 -129 193 -344 438 -535 610 -531 478 -1170 773 -1878 867 -146 20 -562 34 -677 24z"></path></g></svg>
  </button>
  <button class="comment">
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24"><path d="M12,2C6.5,2,2,6.5,2,12c0,2.3,0.8,4.5,2.3,6.3l-2,2c-0.4,0.4-0.4,1,0,1.4C2.5,21.9,2.7,22,3,22h9c5.5,0,10-4.5,10-10S17.5,2,12,2z M8,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S8.6,13,8,13z M12,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S12.6,13,12,13z M16,13c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S16.6,13,16,13z"></path></svg>
  </button>
<button>
  <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="black"></path></svg>
</button> */}