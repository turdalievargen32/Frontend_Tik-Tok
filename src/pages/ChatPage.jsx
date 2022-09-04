import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContactCard from '../components/chats/ChatContactCard';
import MessageBlock from "../components/chats/MessageBlock"
import { useAuth } from '../context/AuthContextProvider';
import { useChat } from '../context/ChatContextProvider';
import "../styles/chatPage.css";

const ChatPage = () => {

  const { getChats, sendMessage, chats, getChatDetails, chat_details } = useChat();
  const { getProfiles, users } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    getChats();
    getProfiles();
  }, []);

  const [sendBtn, setSendBtn] = useState("#F1F1F2");

  function FuncSendBtn (e) {
    // (e == "") ? 
    if (e) {
      setSendBtn("#FE2C55");
    } else {
      setSendBtn("#F1F1F2")
    }
  }

  const isAuth = () => {
    return localStorage.getItem("email") ? true : false
  }

  const getReceiverId = (receiver) => users?.filter((user) => user.username == receiver)[0]?.id;

  const handleSend = (chat_id, receiver_id, message_body) => {
    sendMessage(chat_id, receiver_id, message_body)
  }

  console.log(chat_details)
  return (
    isAuth() ? 
    <div className='chatPage'>
      <div className="container">
        <div className="left__chat-block">
          <div className="left__chat_header">
            <div className='left__chat_back-arrow' onClick={()=>navigate(-1)}>
              <svg width="20" height="20" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L10.8284 22H39C39.5523 22 40 22.4477 40 23V25C40 25.5523 39.5523 26 39 26H10.8284L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
            </div>
            <h3>
              Messages
            </h3>
          </div>
          <ul className="left__chat_list">
            {
              chats?.map((chat, index) => (
                chat.length ? 
                <div key={index} onClick={()=>getChatDetails(chat[0].chat_id)}>
                  <ChatContactCard chat={chat} key={index}/>
                </div>
                : null
              ))
            }
          </ul>
        </div>
        <div className="right__chat-block">
          <div className="chat__block">
            <div className="chat-block__header">
              <a className="companion__profile-block">
                <div className="companion__profile-block_avatar">
                  <img loading="lazy" src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/461e6d4490e2f1a9377f5df6bc530aa9.jpeg?x-expires=1661965200&amp;x-signature=wu4kVib%2B4dJkg7xEWj124jsKVUU%3D" />
                </div>
                <div className="companion__profile-block_username">
                  <b>{chat_details.length ? chat_details[0].receiver : "Direct messages"}</b>
                </div>
              </a>
            </div>
            <div className="chat-block__chat-history">
              <div className="block">
                {
                  chat_details.length ? 
                  chat_details.map((message, index) => (
                    <MessageBlock message={message} key={index}/>
                  ))
                  :
                  <></>
                }
              </div>
            </div>
            <div className="chat-block__send-block">
              <div className="chat-block__send_input__block">
                <input type="text" placeholder='Send a message...' onChange={(e) => {
                  FuncSendBtn(e.target.value)
                  setMessage(e.target.value)
                }} />
                <button onClick={()=>handleSend(chat_details[0]?.chat_id, getReceiverId(chat_details[0]?.receiver), message)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="2em" height="2em" data-e2e="message-send" className="tiktok-d7yhdo-StyledSendButton e1823izs2"><path fill={sendBtn} fillRule="evenodd" d="M30.488 4.667A1.333 1.333 0 0029.333 4H2.667a1.333 1.333 0 00-.987 2.23l6.96 7.65c.37.406.948.544 1.46.35l9.667-3.674c.112-.043.163-.025.186-.016a.303.303 0 01.138.13.303.303 0 01.047.184c-.003.023-.012.077-.104.154l-7.936 6.732c-.41.347-.57.905-.41 1.417l3.04 9.67a1.333 1.333 0 002.427.266L30.488 6c.238-.413.238-.92 0-1.333z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    <h2 style={{margin: '20%'}}>You need to Log In for chatting</h2>
  );
};

export default ChatPage;
// #FE2C55
// onChange={(e) => (e.target.value == "") ? setSendBtn("#F1F1F2") : setSendBtn("#FE2C55")}