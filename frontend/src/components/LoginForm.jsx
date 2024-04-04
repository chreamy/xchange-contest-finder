import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import Modal from "./UI/Modal";

import styles from "./LoginForm.module.css";

const LoginForm = ({ onClose }) => {
  const handleGoogleLoginSuccess = (res) => {
    console.log("Login Success:", res.credential);
    axios.post("http://localhost:3001/user/google-login", {
      token: res.credential,
      test: "aaa",
    });
  };
  const handleGoogleLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.h2}>登入帳號</h2>
      <form className={styles.form} action="">
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;帳號&nbsp;&nbsp;&nbsp;</label>
          <input type="text" required></input>
        </div>
        <div className={styles.formItem}>
          <label>&nbsp;&nbsp;&nbsp;&nbsp;密碼&nbsp;&nbsp;&nbsp;</label>
          <input type="password" required></input>
        </div>
        <div className={styles.formItem}>
          <label>確認密碼</label>
          <input type="password" required></input>
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
