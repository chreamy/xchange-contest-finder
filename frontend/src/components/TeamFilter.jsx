import styles from "./Filter.module.css";

const TeamFilter = () => {
  return (
    <div className={styles.container}>
      <button>最新</button>
      <p>|</p>
      <button>即將額滿</button>
      <p>|</p>
      <button>地區</button>
    </div>
  );
};

export default TeamFilter;
