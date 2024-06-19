import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Modal from "./UI/Modal";

import { HOST } from "../const";
import styles from "./LoginForm.module.css";

const LoginForm = ({ onClose }) => {
  const handleGoogleLoginSuccess = (res) => {
    console.log("Login Success:", res.credential);
    axios.post(`${HOST}/user/google-login`, {
      token: res.credential,
    }).then(response => {
      // Assuming the API sends back a token upon successful authentication
      localStorage.setItem('authToken', response.data.token);
      console.log("Token saved to local storage.");
      onClose(); // Optionally close the modal on successful login
    }).catch(error => {
      console.error("Login error:", error);
    });
  };

  const handleGoogleLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    axios.post(`${HOST}/user/login`, {
      email: email,
      password: password,
    }).then(response => {
      // Assuming the API sends back a token upon successful authentication
      localStorage.setItem('authToken', response.data.token);
      console.log("Token saved to local storage.");
      onClose();
      window.location.reload()
    }).catch(error => {
      console.error("Login error:", error);
    });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.h2}>登入帳號</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;</label>
          <input name="email" type="text" required />
        </div>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;密碼&nbsp;&nbsp;&nbsp;</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <hr />
      <div className={styles.googleLogin}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
        />
      </div>
      <br />
      <button className={styles.button} onClick={onClose}>
        關閉
      </button>
    </Modal>
  );
};

export default LoginForm;
