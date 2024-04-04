import styles from "./Nav.module.css";

const Nav = ({ onShowSignUp, onShowLogin }) => {
  return (
    <div className={styles.background}>
      <h2 id={styles.logo}>LOGO</h2>
      <button className={styles.pageLink}>找比賽→</button>
      <button className={styles.pageLink}>找隊伍→</button>
      <button className={styles.pageLink}>找隊友→</button>
      <div className={styles.space}></div>
      <button id={styles.signUp} onClick={onShowSignUp}>
        Sign Up
      </button>
      <button id={styles.logIn} onClick={onShowLogin}>
        Log in
      </button>
    </div>
  );
};

export default Nav;
