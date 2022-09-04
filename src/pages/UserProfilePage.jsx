import React, { useEffect, useState } from 'react';
import ProfileVideoCard from '../components/ProfileVideoCard';
import SideBar from '../components/SideBar';
import "../styles/userProfilePage.css"
import rena from '../assets/images/rena.jpg'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import FollowCard from '../components/follow/FollowCard';
import FollowerCard from "../components/follow/FollowersCard"
import { useChat } from '../context/ChatContextProvider';
import { useAuth } from '../context/AuthContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../context/PostContextProvider';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const UserProfilePage = () => {
  const { createChat, getChats, chats } = useChat();
  const { getProfiles, users, followProfile } = useAuth();
  const { getPosts, posts } = usePost();
  const { id } = useParams();




  const [subBtn, setSubBtn] = React.useState("")

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openFollowers, setOpenFollowers] = React.useState(false);
  const handleOpenFollowers = () => setOpenFollowers(true);
  const handleCloseFollowers = () => setOpenFollowers(false);

  const [current_profile, setCurrent_profile] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    getProfiles();
  }, [])

  useEffect(() => {
    getChats();
    getUser();
  }, [users])

  useEffect(() => {
    getUser();
  }, [id])

  const getUser = () => { // user profile id\
    users.forEach((user) => {
      if (user.id == id) {
        setCurrent_profile(user)
      }
    })
  }


  const handleChat = (id) => { //current_profile_id
    const filledChats = chats.filter((chat) => chat.length);

    console.log(filledChats)
    let res = filledChats.filter((chat) => {
      if (chat[0].receiver == current_profile.username) {
        return chat;
      }
    })

    console.log(res)

    res.length ? navigate("/chats") : createChat(id);
  }

  const isAuth = () => {
    return localStorage.getItem("email") ? true : false
  }

  console.log(current_profile)



  return current_profile.id ? <div id='wrapper' style={{ display: "flex" }}>
    <div className="position-sidebar__1">
      <div className="position-sidebar__2">
        <div className="position-sidebar__3">
          <div className="position-sidebar__4">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
    <main className="profile__block">
      <div className="profile__header">
        <div className="profile__header_top">
          <div className="profile__header-top_card">
            <span className='profile__avatar_wrapper'>
              <img className="profile__avatar" src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/74232ad156c51fa34369d71fd7fb258d.jpeg?x-expires=1661659200&x-signature=6ndoyvbHuryfiUWjhjYaBhqUb%2F8%3D" alt="" />
            </span>
            <div className="profile__title-container">
              <div className="profile__title_user">
                <div className="profile__title_username">
                  {current_profile.username}
                </div>
                <div className="profile__title_name">
                  {current_profile.email}
                </div>
              </div>
              {/* <div className="profile__btn-subscribe"> */}
              {
                (localStorage.getItem("email") == current_profile.email) ? (
                  <div className="profile__btn-subscribed_list">
                    <button className='profile__btn-change_profile'>Изменить профиль</button>
                  </div>
                ) : (
                  <>
                    {console.log(current_profile.followers.map((e) => (e.username == localStorage.getItem("username"))).some(e => e == true))}

                    {current_profile.followers.map((e) => (e.username == localStorage.getItem("username"))).some(e => e == true) ? (

                      <>
                        <div className="profile__btn-subscribed_list">
                          {
                            isAuth() ?
                              <button className='profile__btn-subscribed_item' onClick={() => handleChat(id)}>Send Message</button>
                              :
                              <button className='profile__btn-subscribed_item' onClick={() => navigate("/chats")}>Send Message</button>
                          }
                          <button className='profile__btn-subscribed_item' onClick={() => followProfile(current_profile.id)}>
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.0001 13C13.0001 9.68629 15.6864 7 19.0001 7C22.3139 7 25.0001 9.68629 25.0001 13C25.0001 16.3137 22.3139 19 19.0001 19C15.6864 19 13.0001 16.3137 13.0001 13ZM19.0001 3C13.4773 3 9.00015 7.47715 9.00015 13C9.00015 18.5228 13.4773 23 19.0001 23C24.523 23 29.0001 18.5228 29.0001 13C29.0001 7.47715 24.523 3 19.0001 3ZM5.19435 40.9681C6.70152 35.5144 10.0886 32.2352 13.9162 30.738C17.7125 29.2531 22.0358 29.4832 25.6064 31.2486C26.1015 31.4934 26.7131 31.338 26.9931 30.8619L28.0072 29.1381C28.2872 28.662 28.1294 28.0465 27.6384 27.7937C23.0156 25.4139 17.4034 25.0789 12.4591 27.0129C7.37426 29.0018 3.09339 33.3505 1.2883 40.0887C1.14539 40.6222 1.48573 41.1592 2.02454 41.2805L3.97575 41.7195C4.51457 41.8408 5.04724 41.5004 5.19435 40.9681ZM44.7074 30.1212C45.0979 29.7307 45.0979 29.0975 44.7074 28.707L43.2932 27.2928C42.9026 26.9023 42.2695 26.9023 41.8789 27.2928L30.0003 39.1715L25.1216 34.2928C24.7311 33.9023 24.0979 33.9023 23.7074 34.2928L22.2932 35.707C21.9026 36.0975 21.9026 36.7307 22.2932 37.1212L28.586 43.4141C29.3671 44.1952 30.6334 44.1952 31.4145 43.4141L44.7074 30.1212Z"></path></svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="profile__btn-subscribe">
                          <button onClick={() => followProfile(current_profile.id)}>
                            Подписаться
                          </button>
                        </div>
                      </>
                    )}

                  </>

                )
              }

              {/* <div className="profile__btn-subscribed_list">
                {
                  isAuth() ?
                    <button className='profile__btn-subscribed_item' onClick={() => handleChat(id)}>Send Message</button>
                    :
                    <button className='profile__btn-subscribed_item' onClick={() => navigate("/chats")}>Send Message</button>
                }
                <button className='profile__btn-subscribed_item'>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.0001 13C13.0001 9.68629 15.6864 7 19.0001 7C22.3139 7 25.0001 9.68629 25.0001 13C25.0001 16.3137 22.3139 19 19.0001 19C15.6864 19 13.0001 16.3137 13.0001 13ZM19.0001 3C13.4773 3 9.00015 7.47715 9.00015 13C9.00015 18.5228 13.4773 23 19.0001 23C24.523 23 29.0001 18.5228 29.0001 13C29.0001 7.47715 24.523 3 19.0001 3ZM5.19435 40.9681C6.70152 35.5144 10.0886 32.2352 13.9162 30.738C17.7125 29.2531 22.0358 29.4832 25.6064 31.2486C26.1015 31.4934 26.7131 31.338 26.9931 30.8619L28.0072 29.1381C28.2872 28.662 28.1294 28.0465 27.6384 27.7937C23.0156 25.4139 17.4034 25.0789 12.4591 27.0129C7.37426 29.0018 3.09339 33.3505 1.2883 40.0887C1.14539 40.6222 1.48573 41.1592 2.02454 41.2805L3.97575 41.7195C4.51457 41.8408 5.04724 41.5004 5.19435 40.9681ZM44.7074 30.1212C45.0979 29.7307 45.0979 29.0975 44.7074 28.707L43.2932 27.2928C42.9026 26.9023 42.2695 26.9023 41.8789 27.2928L30.0003 39.1715L25.1216 34.2928C24.7311 33.9023 24.0979 33.9023 23.7074 34.2928L22.2932 35.707C21.9026 36.0975 21.9026 36.7307 22.2932 37.1212L28.586 43.4141C29.3671 44.1952 30.6334 44.1952 31.4145 43.4141L44.7074 30.1212Z"></path></svg>
                </button>
              </div> */}

            </div>
          </div>
          <div className="profile__descr-container">
            <div className="profile__stats">
              <div>
                <Button onClick={handleOpen}>
                  <div className="profile__following">
                    <span>{current_profile.id ? current_profile.following.length : "loading"}</span>
                    Подписки
                  </div>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderBottom: "2px solid black" }}>
                      Подписки
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, overflowY: "auto", overflowX: "hidden" }}>
                      <div className="followers__block">
                        {current_profile.following.map((acc) => <FollowCard profile={acc} />)}
                        {console.log(current_profile.following)}
                      </div>
                    </Typography>
                  </Box>
                </Modal>
              </div>
              <div>
                <Button onClick={handleOpenFollowers}>
                  <div className="profile__followers">
                    <span>
                      {current_profile.id ? current_profile.followers.length : "loading"}
                    </span>
                    Подписчики
                  </div>
                </Button>
                <Modal
                  open={openFollowers}
                  onClose={handleCloseFollowers}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ borderBottom: "2px solid black" }}>
                      Подписчики
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, overflowY: "auto", overflowX: "hidden" }}>
                      <div className="followers__block">
                        {current_profile.followers.map((acc) => <FollowerCard profile={acc} />)}
                        {console.log(current_profile.followers)}
                      </div>
                    </Typography>
                  </Box>
                </Modal>
              </div>
              {/* <div>
                <div className="profile__like-count">
                  <span>
                    98
                  </span>
                  Лайки
                </div>
              </div>
              <div className="profile__following">
                <span>20</span>
                Подписки
              </div>
              <div className="profile__followers">
                <span>
                  13
                </span>
                Подписчики
              </div>
              <div className="profile__like-count">
                <span>
                  98
                </span>
                Лайки
              </div> */}
            </div>
            <div className="profile__descr">
              {current_profile.description}
            </div>
          </div>
        </div>
      </div>
      <div className="profile__content">
        <input type="radio" name="profile-tab" id='profile_tab-videos' style={{ display: "none" }} defaultChecked />
        <input type="radio" name="profile-tab" id='profile_tab-likes' style={{ display: "none" }} />
        <div className="profile__tabs">
          <label htmlFor="profile_tab-videos" className='profile_tab-videos'>
            <p>
              Клипы
            </p>
            <div></div>
          </label>
          <label htmlFor="profile_tab-likes" className='profile_tab-likes'>
            <p>
              Лайкнул(а)
            </p>
          </label>
        </div>
        <div className="profile__own-videos">
          {
            posts?.map((post, index) => (
              post.user_id === id ? <ProfileVideoCard post={post} key={index} /> : <></>
              // <ProfileVideoCard post={post} key={index} />
            ))
          }
        </div>
        <div className="profile__own-likes">
          {
            posts?.map((post, index) => (

              post.liked_by.find((elem) => elem.user == id) ? <ProfileVideoCard post={post} key={index} /> : <></>
              // <ProfileVideoCard post={post} key={index} />
            ))
          }
        </div>
      </div>
    </main >
  </div >
    :
    <>Loading</>
};

export default UserProfilePage;