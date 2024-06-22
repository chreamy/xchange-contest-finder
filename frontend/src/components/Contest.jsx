import styles from "./Contest.module.css";
import { Link } from "react-router-dom";

const Contest = (props) => {
  return (
    <div className={styles.contest}>
      <div>
        <img className={styles.img} src={props.coverImg} alt="Contest" />
      </div>
      <div className={styles.descriptionArea}>
        <p className={styles.title}>{props.title}</p>
        <Link to={`/contest-detail/${props.link}`} className={styles.readMore}>
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default Contest;
