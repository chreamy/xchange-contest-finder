import styles from "./Filter.module.css";

const Filter = ({ options }) => {
  return (
    <div className={styles.container}>
      {options.map((o, i) => (
        <>
          <button>{o}</button>
          {i === options.length - 1 ? <></> : <p>|</p>}
        </>
      ))}
    </div>
  );
};

export default Filter;
