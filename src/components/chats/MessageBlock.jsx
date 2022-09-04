import { YouTube } from '@mui/icons-material';
import React from 'react';
import "../../styles/chatPage.css";
import { getDateAndTime } from '../../helpers/funcs'


const MessageBlock = ({message}) => {
  const you = {
    username: "Bekzhan",
    email: "oooo@gmail.com",
    image: "https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg"
  }
  const companion = {
    username: "Companion",
    email: "companion@gmail.com",
    image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
  }

  return (
    <>
      {
        (localStorage.getItem("username") == message.receiver) ? (
          <div className="message__block">
            <div className="message__block-avatar">
              <img src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/461e6d4490e2f1a9377f5df6bc530aa9.jpeg?x-expires=1662008400&x-signature=Kn%2BN6mnsE3IOiVWTvUmShpKhXOE%3D" alt="" />
            </div>
            <div className="message__block_text">
              <p title='8/29/2022'>
                {message.message}
              </p>
            </div>
            <span className='message-time'>{getDateAndTime(message.date)}</span>
          </div>
        ) : (
          <div className="message__block-reverse">
            <div className="message__block-avatar">
              <img src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/461e6d4490e2f1a9377f5df6bc530aa9.jpeg?x-expires=1662008400&x-signature=Kn%2BN6mnsE3IOiVWTvUmShpKhXOE%3D" alt="" />
            </div>
            <div className="message__block_text-reverse">
              <p title='8/29/2022'>
                {message.message}
              </p>
            </div>
            <span className='message-time'>{getDateAndTime(message.date)}</span>
          </div>
        )
      }
    </>
  );
};

export default MessageBlock;