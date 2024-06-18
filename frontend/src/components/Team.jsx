import styles from "./Team.module.css";
import { Link } from "react-router-dom";

const Team = (props) => {
  return (
    <div className={styles.team}>
      <div className={styles.descriptionArea}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.users}>人數：{props.users}</p>
        <p className={styles.contest}>比賽：{props.contest}</p>
        <p className={styles.description}>隊伍簡介：</p>
        <p className={styles.description}>{props.introduction}</p>
        {/*<a href={props.link} className={styles.joinTeam}>
          加入我們 →
        </a>
        */}
        <Link to={`/team-detail/${props.link}`} className={styles.joinTeam}>
          加入我們 →
        </Link>
      </div>
    </div>
  );
};

export default Team;
