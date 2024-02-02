import styles from "./Filter.module.css";

const Filter = () => {
  return (
    <div className={styles.container}>
      <button>最新</button>
      <p>|</p>
      <button>熱門</button>
      <p>|</p>
      <button>地區</button>
      <p>|</p>
      <button>截止</button>
    </div>
  );
};

export default Filter;
