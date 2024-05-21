import styles from "./Team.module.css";

const Team = (props) => {
  return (
    <div className={styles.contest}>
      <div>
        <img className={styles.img} src={props.coverImg} alt="Contest" />
      </div>
      <div className={styles.descriptionArea}>
        <p className={styles.title}>{props.title}</p>
        <a href={props.link} className={styles.readMore}>
          Read more →
        </a>
      </div>
    </div>
  );
};

export default Team;
