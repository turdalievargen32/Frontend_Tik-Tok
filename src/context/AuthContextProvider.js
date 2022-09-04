import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext();
export const useAuth = () => useContext(authContext);

const API = "https://tektonik.herokuapp.com/";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.access}`,
    },
  };

  const register = async (email, username, password, password_confirm) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_confirm", password_confirm);
    try {
      const res = await axios.post(
        `${API}user_account/register/`,
        formData,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      setError("Error occured");
    }
  };

  const login = async (email, password) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      let res = await axios.post(`${API}user_account/login/`, formData);
      navigate("/");
      console.log(res.data);
      localStorage.setItem("token", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      getProfile();
      console.log(user);
      localStorage.setItem("username", user.username);
    } catch (error) {
      console.log(error);
      setError("Wrong username or password", error);
    }
  };

  const logout = async () => {
    if (localStorage.getItem("token")) {
      try {
        const Authorization = `Bearer ${token.access}`;

        console.log(Authorization);

        let formData = new FormData();
        formData.append("refresh", token.refresh);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        let res = await axios.post(`${API}user_account/logout/`, formData, {
          headers: { Authorization },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };
  const resetPassword = async (email) => {
    let formData = new FormData();
    formData.append("email", email);
    let res = await axios.post(`${API}user_account/forgot_password/`, formData);
    navigate("/");
  };

  const changePassword = async (password, newPassword) => {
    try {
      let formData = new FormData();
      formData.append("old_password", password);
      formData.append("new_password", newPassword);

      let res = await axios.put(
        `${API}user_account/change_password/`,
        formData,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const getProfile = async () => {
    const Authorization = `Bearer ${token.access}`;

    await axios(`${API}user_account/profile/`, {
      headers: { Authorization },
    }).then((res) => {
      setUser(res.data);
    });
  };

  const getProfiles = async () => {
    let res = await axios(`${API}user_account/profiles/`);
    setUsers(res.data.results);
  };

  const followProfile = async (id) => {
    let fakeuser = {
      following_user_id: id,
    };
    let res = await axios.post(
      `${API}user_account/profile/follow/`,
      fakeuser,
      config
    );
    console.log(res);
  };

  return (
    <authContext.Provider
      value={{
        register,
        login,
        getProfile,
        getProfiles,
        logout,
        error,
        user,
        users,
        setError,
        followProfile,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
