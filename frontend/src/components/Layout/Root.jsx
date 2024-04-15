import { useState } from "react";
import { Outlet } from "react-router-dom";

import Footer from "../UI/Footer";
import Nav from "../UI/Nav";
import SignUpForm from "../SignUpForm";
import LoginForm from "../LoginForm";

const Root = () => {
  const [signUpIsShown, setSignUpIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);

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
      <Nav onShowSignUp={showSignUpHandler} onShowLogin={showLoginHandler} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
