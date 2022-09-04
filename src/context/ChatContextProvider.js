import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTIONS, API } from '../helpers/consts'

export const chatContext = React.createContext();
export const useChat = () => useContext(chatContext);

const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
  
const config = {
  headers: { 
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token.access}`
  },
};

const INIT_STATE = {
  chats: [],
  chat_details: [],
}

const reducer = (state=INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_CHATS:
      return { ...state, chats: action.payload };
    case ACTIONS.GET_CHAT_DETAILS:
      return { ...state, chat_details: action.payload };
    default:
      return state;
  }
}

const ChatContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getChats = async () => {
    let res = await axios(`${API}chat/list/`, config)
      .then((response)=> {
        dispatch({
          type: ACTIONS.GET_CHATS,
          payload: response.data,
        });
      });
  }

  const createChat = async (id) => {
    console.log('creating chat with ' + id)
    let chat = {
      receiver: id,
    }

    let res = await axios.post(`${API}chat/create/`, chat, config)
    console.log(res)
    navigate('/chats')
  }

  const getChatDetails = async (id) => {
    let res = await axios(`${API}chat/list/${id}/`, config)
    dispatch({
      type: ACTIONS.GET_CHAT_DETAILS,
      payload: res.data,
    })
  }

  const sendMessage = async (chat_id, receiver_id, messageText) => {
    let newMessage = {
      message: messageText,
      receiver: receiver_id,
    }

    let res = await axios.post(`${API}chat/messages/create/${chat_id}/`, newMessage, config); //replace with chat_id
    console.log(res)
  }

  const values = {
    createChat,
    getChats,
    sendMessage,
    getChatDetails,
    chats: state.chats,
    chat_details: state.chat_details,
  }

  return (
    <chatContext.Provider
      value={values}
    >
      {children}
    </chatContext.Provider>
  );
}

export default ChatContextProvider;