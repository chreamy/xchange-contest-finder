import styles from "./Contest.module.css";

const Contest = (props) => {
  return (
    <div className={styles.contest}>
      <div className={styles.img}>{/*props.media[0]*/}</div>
      <div className={styles.descriptionArea}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.description}>截止日期：{props.date}</p>
        <p className={styles.description}>比賽地區：{props.address}</p>
        <button className={styles.readMore}>Read more →</button>
      </div>
    </div>
  );
};

export default Contest;
