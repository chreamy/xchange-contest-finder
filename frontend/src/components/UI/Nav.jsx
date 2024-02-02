import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.background}>
      <h2 id={styles.logo}>LOGO</h2>
      <button className={styles.pageLink}>找比賽 v</button>
      <button className={styles.pageLink}>找隊友</button>
      <div className={styles.space}></div>
      <form className={styles.searchBar}>
        <input type="text" />
        <button>搜尋</button>
      </form>
      <button id={styles.signUp}>Sign Up</button>
      <button id={styles.logIn}>Log in</button>
    </div>
  );
};

export default Nav;
