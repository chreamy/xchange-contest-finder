import styles from "./Team.module.css";

const Team = (props) => {
  return (
    <div className={styles.team}>
      <div className={styles.descriptionArea}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.users}>人數：{props.users}</p>
        <p className={styles.contest}>比賽：{props.contest}</p>
        <p className={styles.description}>隊伍簡介：</p>
        <p className={styles.description}>{props.description}</p>
        <a href={props.link} className={styles.joinTeam}>
          加入我們 →
        </a>
      </div>
    </div>
  );
};

export default Team;
