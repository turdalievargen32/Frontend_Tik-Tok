import React from 'react';
import { getDate } from '../../helpers/funcs'

const chatContactCard = ({ chat }) => {

  return (
    <li className="left__chat_item">
      <div className="chat__profile-avatar">
        <img loading="lazy" src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/461e6d4490e2f1a9377f5df6bc530aa9.jpeg?x-expires=1661965200&amp;x-signature=wu4kVib%2B4dJkg7xEWj124jsKVUU%3D" />
      </div>
      <div className="chat__list-info">
        <div className="chat__companion_username">
          <b>{chat.length ? chat[0].receiver : ""}</b>
        </div>
        <div className="chat__message_preview">
          <div className='chat__message_preview-item1'>{chat.length ? chat[0].message : ""}</div> <span className='chat__message_preview-item2'>{chat.length ? getDate(chat[0].date) : ""}</span>
        </div>
      </div>
    </li>
  );
};

export default chatContactCard;