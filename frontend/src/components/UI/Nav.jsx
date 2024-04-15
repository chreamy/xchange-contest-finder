import { NavLink } from "react-router-dom";

import styles from "./Nav.module.css";

const Nav = ({ onShowSignUp, onShowLogin }) => {
  return (
    <nav className={styles.background}>
      <h2 id={styles.logo}>LOGO</h2>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink
        }
        to="contest-list"
      >
        找比賽→
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink
        }
        to="team"
      >
        找隊伍→
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink
        }
        to="partner"
      >
        找隊友→
      </NavLink>
      <div className={styles.space}></div>
      <button id={styles.signUp} onClick={onShowSignUp}>
        Sign Up
      </button>
      <button id={styles.logIn} onClick={onShowLogin}>
        Login
      </button>
    </nav>
  );
};

export default Nav;
