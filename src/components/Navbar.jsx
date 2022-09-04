import React from "react";
import { useState } from "react";
import "../styles/navbar.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useAuth } from "../context/AuthContextProvider";
import logo from "../assets/icons/logo_black.svg";

import Popper from "@mui/material/Popper";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { usePost } from "../context/PostContextProvider";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const LoginContext = React.createContext();
export const useLogin = () => React.useContext(LoginContext);

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openLog, setOpenLog] = React.useState(false);
  const handleOpenLog = () => setOpenLog(true);
  const handleCloseLog = () => setOpenLog(false);

  const [openFor, setOpenFor] = React.useState(false);
  const handleOpenFor = () => setOpenFor(true);
  const handleCloseFor = () => setOpenFor(false);

  const [openChange, setOpenChange] = React.useState(false);
  const handleOpenChange = () => setOpenChange(true);
  const handleCloseChange = () => setOpenChange(false);

  const {
    register,
    login,
    logout,
    error,
    setError,
    resetPassword,
    changePassword,
  } = useAuth();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const [username, SetUsername] = useState();
  const [passwordConfirm, SetPasswordConfirm] = useState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const { getPosts } = usePost();

  const location = useLocation();

  useEffect(() => {
    setSearchParams({
      search: search,
    });
  }, [search]);

  useEffect(() => {
    setError("");
  }, []);

  useEffect(() => {
    getPosts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({});
  }, []);

  function handleRegister() {
    register(email, username, password, passwordConfirm);
  }

  function handleChange(password, newPassword) {
    console.log(password + ' ' + newPassword)
    changePassword(password, newPassword);
  }

  function handleInp(e) {
    if (e.target.id == "password") {
      SetPassword(e.target.value)
    } else if (e.target.id == "newpassword") {
      SetNewPassword(e.target.value)
    }
  }

  function handleLogin() {
    login(email, password);
  }

  function handleReset() {
    resetPassword(email);
  }

  function handleLog() {
    handleOpenLog();
  }
  function handleSign() {
    handleOpen();
    handleCloseLog();
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? "simple-popper" : undefined;

  return (
    <header>
      <div className="container">
        <div className="header__logo">
          <a onClick={() => navigate("/")}>
            <img src={logo} alt="" className="header-logo" />
          </a>
        </div>
        <div className="header__search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>

        <div className="header__block-right">
          <div className="header__profile_section">
            <Link to="/upload">
              <button className="header__upload-btn">
                + <span>Upload</span>
              </button>
            </Link>
            <div className="header__chat-icon">
              <img
                src="https://play-lh.googleusercontent.com/cF_oWC9Io_I9smEBhjhUHkOO6vX5wMbZJgFpGny4MkMMtz25iIJEh2wASdbbEN7jseAx"
                alt=""
              />
            </div>
          </div>
          <div
            className="header__login"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {localStorage.getItem("username") ? (
              <div>
                <button
                  style={{ marginLeft: "10%" }}
                  aria-describedby={id}
                  type="button"
                  onClick={handleClick}
                >
                  {localStorage.getItem("username")}
                </button>
                <Popper id={id} open={openPopper} anchorEl={anchorEl}>
                  <Box
                    sx={{
                      border: 1,
                      p: 1,
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      Sign out
                    </Button>
                    <Button onClick={() => navigate("/help")}>help</Button>
                    <Button
                      onClick={() => {
                        handleOpenChange();
                        handleCloseLog();
                      }}
                    >
                      change password
                    </Button>
                  </Box>
                </Popper>
              </div>
            ) : (
              <button onClick={handleLog} className="header__btn-login">
                Log in
              </button>
            )}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  width: "400px",
                  height: "600px",
                  border: "none",
                  borderRadius: "5%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ margin: "0 auto" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sign up
                </Typography>
                <Typography>email</Typography>
                <TextField
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="email"
                ></TextField>
                <Typography>username</Typography>
                <TextField
                  value={username}
                  onChange={(e) => SetUsername(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="username"
                ></TextField>
                <Typography onChange={(e) => SetPassword(e.target.value)}>
                  password
                </Typography>
                <TextField
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="password"
                ></TextField>
                <Typography
                  onChange={(e) => SetPasswordConfirm(e.target.value)}
                >
                  confirm password
                </Typography>
                <TextField
                  value={passwordConfirm}
                  onChange={(e) => SetPasswordConfirm(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="confirm password"
                ></TextField>
                <Typography
                  className="link"
                  onClick={handleOpenLog}
                  style={{ fontSize: "1.6vmin" }}
                >
                  already have an account?
                </Typography>

                <Button
                  sx={{ marginTop: "20%" }}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    handleRegister();
                    navigate("/");
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={openFor}
              onClose={handleCloseFor}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  width: "400px",
                  height: "600px",
                  border: "none",
                  borderRadius: "5%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ margin: "0 auto" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Reset password
                </Typography>
                <Typography>enter your email</Typography>
                <TextField
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="email"
                ></TextField>
                <Button
                  sx={{ marginTop: "20%" }}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    handleReset();
                    navigate("/");
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={openChange}
              onClose={handleCloseChange}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  width: "400px",
                  height: "600px",
                  border: "none",
                  borderRadius: "5%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ margin: "0 auto" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Change password
                </Typography>
                <Typography>enter your old password</Typography>
                <TextField
                value={password}
                  onChange={(e)=>handleInp(e)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="password"
                  id="password"
                ></TextField>

                <Typography>enter your new password</Typography>
                <TextField
                value={newPassword}
                  onChange={(e)=>handleInp(e)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="new password"
                  id="newpassword"
                ></TextField>
                <Button
                  sx={{ marginTop: "20%" }}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    handleChange(password, newPassword);
                    navigate("/");
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </div>
          <div>
            <Modal
              open={openLog}
              onClose={handleCloseLog}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={style}
                style={{
                  width: "400px",
                  height: "600px",
                  border: "none",
                  borderRadius: "5%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{ margin: "0 auto" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sign in
                </Typography>
                <Typography>email</Typography>
                <TextField
                  value={email}
                  onChange={(e) => SetEmail(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="email"
                ></TextField>
                <Typography onChange={(e) => SetPassword(e.target.value)}>
                  password
                </Typography>
                <TextField
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                  className="input"
                  sx={{ paddingBottom: "5%" }}
                  placeholder="password"
                ></TextField>

                <Typography
                  className="link"
                  onClick={handleSign}
                  style={{ fontSize: "1.6vmin" }}
                >
                  dont have an account?
                </Typography>

                {error ? <Typography>{error}</Typography> : null}
                <Button
                  sx={{ marginTop: "20%" }}
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    handleLogin();
                    navigate("/");
                  }}
                >
                  Submit
                </Button>
                <Typography
                  onClick={() => {
                    handleOpenFor();
                    handleCloseLog();
                  }}
                >
                  forget password?
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
