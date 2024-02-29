import styles from "./Contest.module.css";

const Contest = (props) => {
  return (
    <div className={styles.contest}>
      <div className={styles.img}>{/*props.media[0]*/}</div>
      <div className={styles.descriptionArea}>
        <p className={styles.title}>{props.title}</p>
        <a href={props.link} className={styles.readMore}>
          Read more →
        </a>
      </div>
    </div>
  );
};

export default Contest;
