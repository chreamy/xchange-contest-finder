import styles from "./Contest.module.css";

const Contest = (props) => {
  return (
    <div className={styles.contest}>
      <div>
        <img className={styles.img} src={props.coverImg} alt="Contest" />
      </div>
      <div className={styles.descriptionArea}>
        <p className={styles.title}>{props.title}</p>
        <a href={`contest-detail/${props.id}`} className={styles.readMore}>
          Read more →
        </a>
      </div>
    </div>
  );
};

export default Contest;
