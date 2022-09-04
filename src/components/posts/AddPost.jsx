import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContextProvider';
import { usePost } from '../../context/PostContextProvider';

const AddPost = () => {

  const { addPost, getCategories, categories } = usePost();
  const { getProfile, user } = useAuth();

  useEffect(()=>{
    getCategories();
    getProfile();
  }, [])

  const [post, setPost] = useState({
    title: '',
    description: '',
    video: '',
    category: '',
  });

  const handleInp = (e) => {
    if (e.target.id === "video") {
      setPost({
        ...post,
        [e.target.id]: e.target.files[0],
      });
    } else {
      setPost({
        ...post,
        [e.target.id]: e.target.value,
      });
    }
  };

  const setCategories = (category) => {
    let toInt = num => parseInt(num);
    let intArr = Array.from(String(category), toInt);
    return intArr;
  }

  const handleSave = (post) => {
    let newPost = new FormData();
    newPost.append("title", post.title);
    newPost.append("description", post.description);
    newPost.append("category", setCategories(post.category));
    newPost.append("video", post.video);
    newPost.append("user", user.id);
    addPost(newPost);
  }

  console.log(user)
  return (
    <div className='creation'>
      <h2>Upload new post</h2>
      <div className="inputs-container">
        <div className="add-post__input">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={(e) => handleInp(e)} />
        </div>
        <div className="add-post__input">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={(e) => handleInp(e)} />
        </div>
        <div className="add-post__input">
          <label htmlFor="description">Category</label>
          <select type="text" id="category" onChange={(e) => handleInp(e)}>
            {
              categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))
            }
          </select>
        </div>
        <div className="add-post__input">
          <label htmlFor="video" className='video-upload__btn'>Video upload</label>
          <input type="file" accept="video/*" id="video" onChange={(e) => handleInp(e)} style={{display: "none"}} />
        </div>
        <button onClick={() => handleSave(post)} className="save__upload-btn">Save</button>
      </div>
    </div>
  );
};

export default AddPost;