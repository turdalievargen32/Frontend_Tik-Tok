import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIONS, API } from '../helpers/consts'

export const postContext = React.createContext();
export const usePost = () => useContext(postContext);

const INIT_STATE = {
  posts: [],
  postDetails: {},
  favoritePosts: [],
  categories: [],
}

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_POSTS:
      return { ...state, posts: action.payload };
    case ACTIONS.GET_FAVORITES:
      return { ...state, favoritePosts: action.payload };
    case ACTIONS.GET_CATEGORIES:
      return { ...state, categories: action.payload }
    default:
      return state;
  }
}

const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${token.access}`
  },
};

const PostContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  const getPosts = async () => {
    const { data } = await axios(`${API}video/videos/${window.location.search}`);

    dispatch({
      type: ACTIONS.GET_POSTS,
      payload: data.results,
    })
  }

  const getCategories = async () => {
    const { data } = await axios(`${API}video/categories/`);

    dispatch({
      type: ACTIONS.GET_CATEGORIES,
      payload: data.results,
    })
  }
  
  const getFavoritePosts = async () => {
    const { data } = await axios(`${API}video/favorites/`, config);

    dispatch({
      type: ACTIONS.GET_FAVORITES,
      payload: data.results,
    })

    console.log(data.results)
  }

  const likePost = (id) => {
    let res = axios(`${API}video/like_post/${id}/`, config);
    console.log(res)
  }

  const addPost = async (newPost) => {
    let res = await axios.post(`${API}video/videos/create/`, newPost, config);
    console.log(res);
  }

  const addComment = async (comment) => {
    let res = await axios.post(`${API}video/comment/`, comment, config);
    console.log(res);
  }

  const addToFavorites = async (id) => {
    let res = await axios(`${API}video/add_to_favorite/${id}/`, config);
    console.log(res);
  }

  const values = {
    getPosts,
    getCategories,
    getFavoritePosts,
    addPost,
    addComment,
    likePost,
    addToFavorites,
    posts: state.posts,
    favoritePosts: state.favoritePosts,
    categories: state.categories,
  }

  return (
    <postContext.Provider
      value={values}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostContextProvider;