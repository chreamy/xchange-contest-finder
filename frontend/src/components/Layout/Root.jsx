import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import Footer from "../UI/Footer";
import Nav from "../UI/Nav";
import NavLogin from "../UI/NavLogin"; // Assuming NavLogin is the navigation bar for logged-in users

const Root = () => {
  const [signUpIsShown, setSignUpIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const showSignUpHandler = () => {
    setSignUpIsShown(true);
  };

  const hideSignUpHandler = () => {
    setSignUpIsShown(false);
  };

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  return (
    <>
      {signUpIsShown && <SignUpForm onClose={hideSignUpHandler} />}
      {loginIsShown && <LoginForm onClose={hideLoginHandler} />}
      {isLoggedIn ? <NavLogin /> : <Nav onShowSignUp={showSignUpHandler} onShowLogin={showLoginHandler} />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;