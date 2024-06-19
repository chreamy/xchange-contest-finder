import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Modal from "./UI/Modal";

import { HOST } from "../const";
import styles from "./SignUpForm.module.css";

const SignUpForm = ({ onClose }) => {
  const handleGoogleLoginSuccess = (res) => {
    console.log("Login Success:", res.credential);
    axios.post(`${HOST}/user/google-login`, {
      token: res.credential,
      test: "aaa",
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error("Signup error:", error);
    });
  };

  const handleGoogleLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios.post(`${HOST}/user/register`, {
      name: name,
      email: email,
      username: username,
      password: password,
    }).then(response => {
      console.log("Signup successful:", response.data);
      onClose(); // Close the modal after successful signup
    }).catch(error => {
      console.error("Signup error:", error);
    });
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.h2}>帳號註冊</h2>
      <form className={styles.form} onSubmit={handleSignUp}>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;姓名&nbsp;&nbsp;&nbsp;</label>
          <input name="name" type="text" required />
        </div>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;Email&nbsp;&nbsp;&nbsp;</label>
          <input name="email" type="text" required />
        </div>
        <div className={styles.formItem}>
          <label>帳號名稱</label>
          <input name="username" type="text" required />
        </div>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;密碼&nbsp;&nbsp;&nbsp;</label>
          <input name="password" type="password" required />
        </div>
        <div className={styles.formItem}>
          <label>確認密碼</label>
          <input name="confirmPassword" type="password" required />
        </div>
        <button type="submit">Sign Up</button>
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

export default SignUpForm;
